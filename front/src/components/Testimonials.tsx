import Repositories from "./Repositories";
import StringsHandler from "./StringsHandler";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollReveal } from "./ScrollReveal";



export const Testimonials = ({ repos, strings }: { repos: Repositories, strings: StringsHandler }) => {


	return (
		<section
			id="testimonials"
			className="container py-24 sm:py-32"
		>
			<ScrollReveal direction="up" delay={0.1}>
				<h2 className="text-3xl md:text-4xl font-bold">
					{(strings as any)[15]}
					<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
						{" "}
						{(strings as any)[16]}{" "}
					</span>
					{(strings as any)[17]}
				</h2>

				<p className="text-xl text-muted-foreground pt-4 pb-8">
					{(strings as any)[18]}
				</p>
			</ScrollReveal>

			<ScrollReveal direction="up" delay={0.2}>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
					{Array.isArray(repos.github) &&
						repos.github
							.sort((a: any, b: any) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
							.slice(0, 9)
							.map((repo: any, index: number) => (
								<Card key={index} className={`max-w-md md:break-inside-avoid overflow-hidden border-l-4 transition-colors ${index % 6 === 0 ? 'border-l-cyan-500 dark:border-l-cyan-400 hover:border-l-cyan-600 dark:hover:border-l-cyan-300' :
										index % 6 === 1 ? 'border-l-purple-500 dark:border-l-purple-400 hover:border-l-purple-600 dark:hover:border-l-purple-300' :
											index % 6 === 2 ? 'border-l-green-500 dark:border-l-green-400 hover:border-l-green-600 dark:hover:border-l-green-300' :
												index % 6 === 3 ? 'border-l-blue-500 dark:border-l-blue-400 hover:border-l-blue-600 dark:hover:border-l-blue-300' :
													index % 6 === 4 ? 'border-l-rose-500 dark:border-l-rose-400 hover:border-l-rose-600 dark:hover:border-l-rose-300' :
														'border-l-orange-500 dark:border-l-orange-400 hover:border-l-orange-600 dark:hover:border-l-orange-300'
									}`}>
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
			</ScrollReveal>
		</section>
	);
};


export default Testimonials;