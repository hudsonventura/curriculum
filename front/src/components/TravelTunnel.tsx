import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

export const TravelTunnel = () => {
    const containerRef = useRef<HTMLDivElement>(null);

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
            valleyWidth: 33.0,

            // Visuals
            flatShading: false,
            wireframe: false,

            // Colors
            bgColor: '#0d74c9ff',
            fogDensity: 0.0066,
            groundColor: '#1a1a1a',
            ceilingColor: '#5e6a75',

            // Lighting
            ambientInt: 0.6,
            camLightInt: 1.5
        };

        // === SCENE INIT ===
        const scene = new THREE.Scene();
        scene.background = null; // Transparent to show constellation through sky
        scene.fog = new THREE.FogExp2(params.bgColor, params.fogDensity);

        const camera = new THREE.PerspectiveCamera(
            60,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            300
        );
        camera.position.set(0, 0, 40);

        // Renderer setup with alpha for transparency
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: "high-performance",
            precision: "highp",
            alpha: true // Enable transparency
        });
        renderer.setClearColor(0x000000, 0); // Transparent background
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // === LIGHTING ===
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, params.ambientInt);
        scene.add(hemiLight);

        const camLight = new THREE.PointLight(0xffaa00, params.camLightInt, 120, 1.5);
        scene.add(camLight);

        // === GRADIENT BACKGROUND ===
        // Create a large plane with gradient shader for background
        const gradientGeometry = new THREE.PlaneGeometry(500, 300);
        const gradientMaterial = new THREE.ShaderMaterial({
            uniforms: {
                topColor: { value: new THREE.Color(0x000000) },
                bottomColor: { value: new THREE.Color(0x000000) }, // Gray color
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 topColor;
                uniform vec3 bottomColor;
                varying vec2 vUv;
                void main() {
                    // Gradient from top (transparent) to bottom (more opaque)
                    float alpha = 0.2 + vUv.y * 0.6; // 20% to 80% opacity
                    vec3 color = mix(topColor, bottomColor, vUv.y);
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
        });

        const gradientPlane = new THREE.Mesh(gradientGeometry, gradientMaterial);
        gradientPlane.position.z = 20; // Closer to camera
        gradientPlane.position.y = 0;
        scene.add(gradientPlane);

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
                    height: '100%',
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(74, 85, 104, 0.4) 30%, rgba(74, 85, 104, 0.7) 60%, rgba(74, 85, 104, 0.9) 100%)',
                    zIndex: 2
                }}
            />

        </div>
    );
};
