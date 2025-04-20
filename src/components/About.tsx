import { Statistics } from "./Statistics";
import pilot from "../assets/pilot.png";
import { Curriculum } from "./Curriculum";

export const About = ({ curriculum }: Curriculum) => {


	return (
		<section
			id="about"
			className="container py-24 sm:py-32"
		>
			<div className="bg-muted/80 border rounded-lg py-12">
				<div className="px-6 flex flex-col md:flex-row gap-8 md:gap-12">
					<div className="md:w-1/2">
						{
							curriculum.skills.map(({ name, icon, description }, index) => (
								<img
									key={index}
									src={icon}
									alt={name}
									className="w-full object-contain rounded-lg max-h-[90px]"
									title={description}
								/>
							))
						}
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
