import { Statistics } from "./Statistics";
import pilot from "../assets/pilot.png";
import { Curriculum } from "./Curriculum";

export const About = ({ curriculum }: Curriculum) => {


	return (
		<section
			id="about"
			className="container py-24 sm:py-32"
		>
			<div className="bg-muted/50 border rounded-lg py-12">
				<div className="px-6 flex flex-col md:flex-row gap-8 md:gap-12">
					<div className="md:w-1/2">
						<img
							src="https://images.icon-icons.com/2148/PNG/512/gnu_icon_132361.png"
							alt=""
							className="w-full object-contain rounded-lg max-h-[120px]"
						/>
						<img
							src="https://cdn.iconscout.com/icon/free/png-256/free-linux-3521549-2944967.png"
							alt=""
							className="w-full object-contain rounded-lg max-h-[120px]"
						/>
						<img
							src="https://raw.githubusercontent.com/hudsonventura/SoftExpertAPI/main/src/dotnet_logo.png"
							alt=""
							className="w-full object-contain rounded-lg max-h-[120px]"
						/>
						<img
							src="https://images.icon-icons.com/2415/PNG/512/postgresql_original_wordmark_logo_icon_146392.png"
							alt=""
							className="w-full object-contain rounded-lg max-h-[120px]"
						/>
						<img
							src="https://logopng.com.br/logos/docker-27.png"
							alt=""
							className="w-full object-contain rounded-lg max-h-[120px]"
						/>
						<img
							src="https://cdn.iconscout.com/icon/free/png-256/free-ubuntu-17-1175077.png?f=webp"
							alt=""
							className="w-full object-contain rounded-lg max-h-[120px]"
						/>
					</div>
					<div className="bg-green-0 flex flex-col justify-between">
						<div className="pb-6">
							<h2 className="text-3xl md:text-4xl font-bold">
								<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
									Sobre{" "}
								</span>
								Mim
							</h2>
							{
								curriculum.about.map((txt, index) => {
									return <p className="text-xl text-muted-foreground mt-4" key={index}>{txt}</p>;
								})
							}
						</div>

						<Statistics curriculum={curriculum} />
					</div>
				</div>
			</div>
		</section>
	);
};
