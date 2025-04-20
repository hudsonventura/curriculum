import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface TestimonialProps {
	image: string;
	name: string;
	userName: string;
	comment: string;
}

import { Respositories } from "./components/Repositories";

const testimonials: TestimonialProps[] = [
	{
		image: "https://github.com/shadcn.png",
		name: "John Doe React",
		userName: "@john_Doe",
		comment: "This landing page is awesome!",
	},
	{
		image: "https://github.com/shadcn.png",
		name: "John Doe React",
		userName: "@john_Doe1",
		comment:
			"Lorem ipsum dolor sit amet,empor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
	},

	{
		image: "https://github.com/shadcn.png",
		name: "John Doe React",
		userName: "@john_Doe2",
		comment:
			"Lorem ipsum dolor sit amet,exercitation. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
	},
	{
		image: "https://github.com/shadcn.png",
		name: "John Doe React",
		userName: "@john_Doe3",
		comment:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
	},
	{
		image: "https://github.com/shadcn.png",
		name: "John Doe React",
		userName: "@john_Doe4",
		comment:
			"Lorem ipsum dolor sit amet, tempor incididunt  aliqua. Ut enim ad minim veniam, quis nostrud.",
	},
	{
		image: "https://github.com/shadcn.png",
		name: "John Doe React",
		userName: "@john_Doe5",
		comment:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
];

export const Testimonials = ({ repos }: Repositories) => {


	return (
		<section
			id="testimonials"
			className="container py-24 sm:py-32"
		>
			<h2 className="text-3xl md:text-4xl font-bold">
				Alguns dos meus
				<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
					{" "}
					repositórios públicos{" "}
				</span>
				no Github atualizados recentemente
			</h2>

			<p className="text-xl text-muted-foreground pt-4 pb-8">
				Manter repositórios públicos no GitHub é uma forma de compartilhar conhecimento, promover transparência e incentivar a colaboração. Ao expor projetos abertamente, contribuo com a comunidade, permito que outras pessoas aprendam com meu código e também recebo feedbacks valiosos. Essa prática fortalece o ecossistema open source, acelera a inovação e demonstra comprometimento com boas práticas de desenvolvimento. Meus repositórios refletem meu aprendizado contínuo, minhas experimentações e meu desejo de construir soluções que possam ser úteis para outros desenvolvedores e profissionais de tecnologia.
			</p>

			<div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
				{repos.github
					.sort((a, b) =>
						new Date(b.pushed_at).getTime() -
						new Date(a.pushed_at).getTime()
					)
					.slice(0, 9)
					.map(
					(repo, index) => (
						<Card
							key={repo.id}
							className="max-w-md md:break-inside-avoid overflow-hidden"
						>
							<CardHeader className="flex flex-row items-center gap-4 pb-2">
								{/* <Avatar>
									<AvatarImage
										alt=""
										src=""
									/>
									<AvatarFallback>OM</AvatarFallback>
								</Avatar> */}

								<div className="flex flex-col">
									<CardTitle className="text-lg"><a target="_blank" href={repo.svn_url} className="">{repo.name}</a></CardTitle>
									<CardDescription>
										{repo.language} |{" "}
										{new Intl.DateTimeFormat("en-US", {
											year: "numeric",
											month: "2-digit",
											day: "2-digit",
											hour: "2-digit",
											minute: "2-digit",
										}).format(new Date(repo.pushed_at))}
									</CardDescription>
								</div>
							</CardHeader>

							<CardContent>{repo.description}</CardContent>
						</Card>
					)
				)}
			</div>
		</section>
	);
};
