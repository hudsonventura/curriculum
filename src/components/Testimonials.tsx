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

export const Testimonials = ({ repos, strings }: { repos: CurricuRepositorieslum, strings: StringsHandler }) => {


	return (
		<section
			id="testimonials"
			className="container py-24 sm:py-32"
		>
			<h2 className="text-3xl md:text-4xl font-bold">
				{strings[15]}
				<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
					{" "}
					{strings[16]}{" "}
				</span>
				{strings[17]}
			</h2>

			<p className="text-xl text-muted-foreground pt-4 pb-8">
			{strings[18]}
			</p>

			<div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
				{Array.isArray(repos.github) &&
					repos.github
						.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
						.slice(0, 9)
						.map((repo) => (
							<Card key={repo.id} className="max-w-md md:break-inside-avoid overflow-hidden">
								<CardHeader className="flex flex-row items-center gap-4 pb-2">
									<div className="flex flex-col">
										<CardTitle className="text-lg">
											<a target="_blank" href={repo.svn_url} className="">
												{repo.name}
											</a>
										</CardTitle>
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
						))}
			</div>
		</section>
	);
};
