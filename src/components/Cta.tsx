import { Curriculum } from "./Curriculum";
import StringsHandler from "./StringsHandler";
import { TimelineCompany } from "./TimelineCompany";
import { TimelineEducational } from "./TimelineEducational";



export const Cta = ({ curriculum, strings }: { curriculum: Curriculum, strings: StringsHandler }) => {
	return (
		<>
			<section id="cta" className="bg-muted/80 py-16 my-24 sm:my-3">
				<div className="container mx-auto px-4 max-w-7xl lg:px-0 lg:flex lg:justify-center">
					<div className="lg:w-full lg:flex lg:flex-col lg:justify-center">
						<h2 className="text-3xl md:text-4xl font-bold mb-8">
							{strings[19]}
							<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
								{" "}
								{strings[20]}{" "}
							</span>
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div>
								<h1 className="text-3xl font-bold mb-8">Expêriencias profissionais</h1>
								<TimelineCompany items={curriculum.companies} />
							</div>
							<div>
							<h1 className="text-3xl font-bold mb-8">Educação</h1>
								<TimelineEducational items={curriculum.educations} />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
