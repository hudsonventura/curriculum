import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import GUI from 'lil-gui';

export const TravelTunnel = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const guiContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // === CONFIGURATION ===
        const params = {
            speed: 20.0,
            showCeiling: false,

            // Terrain settings
            scale: 30.0,
            heightMultiplier: 3.6,
            detailStrength: 0.27,
            valleyWidth: 35.0,

            // Visuals
            flatShading: false,
            wireframe: false,

            // Colors
            bgColor: '#b6c2cc',
            fogDensity: 0.0104,
            groundColor: '#1a1a1a',
            ceilingColor: '#5e6a75',

            // Lighting
            ambientInt: 0.6,
            camLightInt: 1.5
        };

        // === SCENE INIT ===
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(params.bgColor);
        scene.fog = new THREE.FogExp2(params.bgColor, params.fogDensity);

        const camera = new THREE.PerspectiveCamera(
            60,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            300
        );
        camera.position.set(0, 0, 40);

        // Renderer setup with high precision and dithering support to fix banding
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: "high-performance",
            precision: "highp"
        });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // === LIGHTING ===
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, params.ambientInt);
        scene.add(hemiLight);

        const camLight = new THREE.PointLight(0xffaa00, params.camLightInt, 120, 1.5);
        scene.add(camLight);

        // === NOISE & GEOMETRY ===
        const noise2D = createNoise2D();

        const CHUNK_WIDTH = 250;
        const CHUNK_LENGTH = 60;
        const SEGMENTS_W = 100;
        const SEGMENTS_L = 30;
        const CHUNK_COUNT = 6;

        const chunks: THREE.Group[] = [];

        /**
         * Calculates precise height for any coordinate.
         */
        function getElevation(x: number, z: number, isTop: boolean) {
            // Offset for top to ensure unique look
            const offset = isTop ? 9999 : 0;

            // 1. Main Mountains
            let y = noise2D((x + offset) / params.scale, (z + offset) / params.scale) * params.heightMultiplier;

            // 2. Fine Detail
            const detailScale = params.scale * 0.4;
            y += noise2D((x + offset) / detailScale, (z + offset) / detailScale) * (params.heightMultiplier * params.detailStrength);

            // 3. Valley Curve (Clear center)
            const dist = Math.abs(x);
            const valley = Math.pow(dist / params.valleyWidth, 2.5);
            y += valley;

            return y;
        }

        /**
         * Creates the mesh group.
         */
        function createChunk(index: number) {
            const geometry = new THREE.PlaneGeometry(CHUNK_WIDTH, CHUNK_LENGTH, SEGMENTS_W, SEGMENTS_L);
            geometry.rotateX(-Math.PI / 2); // Lay flat

            // Material with Dithering enabled to prevent color banding
            const matGround = new THREE.MeshStandardMaterial({
                color: params.groundColor,
                roughness: 0.9,
                flatShading: params.flatShading,
                wireframe: params.wireframe,
                side: THREE.DoubleSide,
                dithering: true // Fixes gradient banding
            });

            const matCeil = new THREE.MeshStandardMaterial({
                color: params.ceilingColor,
                roughness: 0.9,
                flatShading: params.flatShading,
                wireframe: params.wireframe,
                side: THREE.DoubleSide,
                dithering: true // Fixes gradient banding
            });

            const meshGround = new THREE.Mesh(geometry.clone(), matGround);
            const meshCeil = new THREE.Mesh(geometry.clone(), matCeil);

            meshCeil.visible = params.showCeiling;

            const group = new THREE.Group();
            group.add(meshGround);
            group.add(meshCeil);

            // Store index to calculate exact position later
            (group as any).userData = {
                meshGround,
                meshCeil,
                index: index
            };

            return group;
        }

        /**
         * Updates geometry based on strict world coordinates.
         */
        function updateChunk(chunk: THREE.Group) {
            // Calculate Z based on index to ensure perfect seam
            const zPosition = (chunk as any).userData.index * -CHUNK_LENGTH;
            chunk.position.z = zPosition;

            const geoG = ((chunk as any).userData.meshGround.geometry as THREE.BufferGeometry);
            const posG = geoG.attributes.position;

            const geoC = ((chunk as any).userData.meshCeil.geometry as THREE.BufferGeometry);
            const posC = geoC.attributes.position;

            for (let i = 0; i < posG.count; i++) {
                const x = posG.getX(i);

                // Get local Z (depth relative to chunk center)
                const localZ = posG.getZ(i);
                // Calculate exact World Z
                const worldZ = zPosition + localZ;

                // --- GROUND ---
                const hGround = getElevation(x, worldZ, false);
                posG.setY(i, -5 + hGround);

                // --- CEILING ---
                const hCeil = getElevation(x, worldZ, true);
                posC.setY(i, 5 - hCeil);
            }

            posG.needsUpdate = true;
            geoG.computeVertexNormals();

            posC.needsUpdate = true;
            geoC.computeVertexNormals();
        }

        // === INITIALIZATION ===
        for (let i = 0; i < CHUNK_COUNT; i++) {
            const chunk = createChunk(i);
            updateChunk(chunk);
            chunks.push(chunk);
            scene.add(chunk);
        }

        // === ANIMATION LOOP ===
        const clock = new THREE.Clock();
        let animationId: number;

        function animate() {
            animationId = requestAnimationFrame(animate);

            const dt = clock.getDelta();

            // Move camera
            camera.position.z -= params.speed * dt;
            camLight.position.copy(camera.position);

            // Logic to recycle chunks
            // We move in -Z. Chunks with higher index (more negative Z) are in front.
            // We look for the chunk furthest behind the camera.

            // Find current max index to know where to place recycled chunk
            let maxIndex = 0;
            chunks.forEach(c => { if ((c as any).userData.index > maxIndex) maxIndex = (c as any).userData.index; });

            chunks.forEach(chunk => {
                // If chunk is fully behind camera
                if (chunk.position.z > camera.position.z + CHUNK_LENGTH) {
                    // Move to the front by assigning next index
                    (chunk as any).userData.index = maxIndex + 1;
                    maxIndex++;
                    updateChunk(chunk);
                }
            });

            renderer.render(scene, camera);
        }

        animate();

        // === GUI ===
        let gui: GUI | null = null;
        if (guiContainerRef.current == 0) {
            gui = new GUI({ container: guiContainerRef.current, width: 320 });
            gui.title("Tunnel Controls");

            const f1 = gui.addFolder('Flight');
            f1.add(params, 'speed', 0, 50).name('Speed');

            const f2 = gui.addFolder('Visuals');
            f2.add(params, 'showCeiling').name('Show Ceiling').onChange((v: boolean) => {
                chunks.forEach(c => (c as any).userData.meshCeil.visible = v);
            });
            f2.add(params, 'flatShading').name('Flat Shading').onChange((v: boolean) => {
                chunks.forEach(c => {
                    (c as any).userData.meshGround.material.flatShading = v;
                    (c as any).userData.meshGround.material.needsUpdate = true;
                    (c as any).userData.meshCeil.material.flatShading = v;
                    (c as any).userData.meshCeil.material.needsUpdate = true;
                });
                chunks.forEach(c => updateChunk(c));
            });
            f2.add(params, 'wireframe').name('Wireframe').onChange((v: boolean) => {
                chunks.forEach(c => {
                    (c as any).userData.meshGround.material.wireframe = v;
                    (c as any).userData.meshCeil.material.wireframe = v;
                });
            });

            const f3 = gui.addFolder('Terrain Generator');
            const refresh = () => chunks.forEach(c => updateChunk(c));
            f3.add(params, 'scale', 10, 150).name('Noise Scale').onChange(refresh);
            f3.add(params, 'heightMultiplier', 1, 20).name('Height').onChange(refresh);
            f3.add(params, 'detailStrength', 0, 1).name('Detail').onChange(refresh);
            f3.add(params, 'valleyWidth', 5, 50).name('Valley Width').onChange(refresh);

            const f4 = gui.addFolder('Colors & Atmosphere');
            const updateColors = () => {
                (scene.background as THREE.Color).set(params.bgColor);
                (scene.fog as THREE.FogExp2).color.set(params.bgColor);
                (scene.fog as THREE.FogExp2).density = params.fogDensity;
                hemiLight.intensity = params.ambientInt;
                camLight.intensity = params.camLightInt;
                chunks.forEach(c => {
                    (c as any).userData.meshGround.material.color.set(params.groundColor);
                    (c as any).userData.meshCeil.material.color.set(params.ceilingColor);
                });
            };
            f4.addColor(params, 'bgColor').name('Background').onChange(updateColors);
            f4.addColor(params, 'groundColor').name('Ground Color').onChange(updateColors);
            f4.addColor(params, 'ceilingColor').name('Ceiling Color').onChange(updateColors);
            f4.add(params, 'fogDensity', 0, 0.1).name('Fog Density').onChange(updateColors);
            f4.add(params, 'camLightInt', 0, 3).name('Light Intensity').onChange(updateColors);
        }

        // Handle resize
        const handleResize = () => {
            if (!containerRef.current) return;
            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            if (gui) gui.destroy();
            if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden" style={{ zIndex: 1 }}>
            <div ref={containerRef} className="w-full h-full" />
            {/* Gradient overlay for smooth transition at the top */}
            <div
                className="absolute top-0 left-0 w-full pointer-events-none"
                style={{
                    height: '800px',
                    background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)',
                    zIndex: 2
                }}
            />
            <div ref={guiContainerRef} className="absolute bottom-5 right-5 z-10" />
        </div>
    );
};
