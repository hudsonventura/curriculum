
import { HeroCards } from "./HeroCards";
import { Curriculum } from "./Curriculum";
import StringsHandler from "./StringsHandler";

export const Hero = ({ curriculum, strings }: { curriculum: Curriculum, strings: StringsHandler }) => {
	return (
		<section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-9 gap-10">
			<div className="text-center lg:text-start space-y-6">
				<h1>{curriculum.hello_message}</h1>
				<main className="text-2xl md:text-2xl font-bold">
					<h1 className="inline">
						{curriculum.role}
					</h1>{" "}
					<br />
					<h2 className="inline">
						<span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
							{curriculum.role2}
						</span>{" "}
						
					</h2>
					
				</main>
				


				{/* <div className="space-y-4 md:space-y-0 md:space-x-4">
					<Button className="w-full md:w-1/3">Get Started</Button>

					<a
						rel="noreferrer noopener"
						href="https://github.com/hudsonventura"
						target="_blank"
						className={`w-full md:w-1/3 ${buttonVariants({
							variant: "outline",
						})}`}
					>
						Github
						<GitHubLogoIcon className="ml-2 w-5 h-5" />
					</a>
				</div> */}
			</div>

			{/* Hero cards sections */}
			<div className="z-10">
				<HeroCards curriculum={curriculum} strings={strings} />
			</div>

			{/* Shadow effect */}
			<div className="shadow"></div>
		</section>
	);
};
