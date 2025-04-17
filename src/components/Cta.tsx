import { Timeline } from "./timeline";
import { Button } from "./ui/button";

const timelineItems: TimelineItem[] = [
	{
		id: 1,
		heading: "Company Founded",
		subtitle: "Beginning of our journey",
		date: "January 2020",
		content: "Our company was founded with a mission to create innovative solutions for modern problems.",
		subitems: [
			{
				id: "1-1",
				heading: "Initial Team Formation",
				date: "January 15, 2020",
				content: "Assembled a team of 5 founding members with diverse expertise.",
			},
			{
				id: "1-2",
				heading: "Business Plan Development",
				date: "January 28, 2020",
				content: "Created comprehensive business plan and secured initial seed funding.",
			},
		],
	},
	{
		id: 2,
		heading: "First Major Client",
		subtitle: "Milestone achievement",
		date: "March 2020",
		content: "We secured our first major client and began working on our flagship product.",
		subitems: [
			{
				id: "2-1",
				heading: "Contract Negotiation",
				date: "March 10, 2020",
				content: "Successfully negotiated a 2-year contract with flexible terms.",
			},
			{
				id: "2-2",
				heading: "Project Kickoff",
				date: "March 25, 2020",
				content: "Established project milestones and development roadmap.",
			},
		],
	},
	{
		id: 3,
		heading: "Product Launch",
		subtitle: "Market introduction",
		date: "September 2020",
		content: "Contribuo ativamente com a comunidade de desenvolvedores por meio da publicação de bibliotecas no PyPI e no NuGet. Essas libs foram criadas para resolver desafios reais do dia a dia e são voltadas à reutilização, produtividade e boas práticas. Compartilhar soluções em forma de pacotes públicos me permite não apenas apoiar outros desenvolvedores, mas também aprender continuamente com o feedback da comunidade e evoluir minhas próprias habilidades.",
		subitems: [
			{
				id: "3-1",
				heading: "Beta Testing Phase",
				date: "August 5, 2020",
				content: "Contribuo ativamente com a comunidade de desenvolvedores por meio da publicação de bibliotecas no PyPI e no NuGet. Essas libs foram criadas para resolver desafios reais do dia a dia e são voltadas à reutilização, produtividade e boas práticas. Compartilhar soluções em forma de pacotes públicos me permite não apenas apoiar outros desenvolvedores, mas também aprender continuamente com o feedback da comunidade e evoluir minhas próprias habilidades.",
			},
			{
				id: "3-2",
				heading: "Marketing Campaign",
				date: "August 20, 2020",
				content: "Launched multi-channel marketing campaign reaching over 50,000 potential customers.",
			},
			{
				id: "3-3",
				heading: "Press Coverage",
				date: "September 15, 2020",
				content: "Featured in 3 major industry publications.",
			},
		],
	},
	{
		id: 4,
		heading: "International Expansion",
		subtitle: "Global growth",
		date: "February 2021",
		content: "Expanded our operations to international markets, opening offices in Europe and Asia.",
	},
	{
		id: 5,
		heading: "Series A Funding",
		subtitle: "Financial milestone",
		date: "November 2021",
		content: "Secured $10M in Series A funding to accelerate growth and product development.",
		subitems: [
			{
				id: "5-1",
				heading: "Investor Presentations",
				date: "September 5, 2021",
				content: "Delivered 12 investor presentations over a 3-month period.",
			},
			{
				id: "5-2",
				heading: "Term Sheet Negotiation",
				date: "October 18, 2021",
				content: "Negotiated favorable terms with lead investor.",
			},
		],
	},
]

export const Cta = () => {
	return (
		<>
			<section id="cta" className="bg-muted/50 py-16 my-24 sm:my-3">
				<div className="container mx-auto px-4 max-w-7xl lg:px-0 lg:flex lg:justify-center">
					<div className="lg:w-full lg:flex lg:flex-col lg:justify-center">
						<h2 className="text-3xl md:text-4xl font-bold mb-8">
							Veja minhas
							<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
								{" "}
								experiências{" "}
							</span>
							e
							<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
								{" "}
								escolaridade{" "}
							</span>
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div>
								<h1 className="text-3xl font-bold mb-8">Expêriencias profissionais</h1>
								<Timeline items={timelineItems.slice(0, 3)} />
							</div>
							<div>
							<h1 className="text-3xl font-bold mb-8">Educação</h1>
								<Timeline items={timelineItems.slice(3)} />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
