import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../components/Icons";
import { FaGithub } from "react-icons/fa6";
import { SiNuget } from "react-icons/si";





export const HowItWorks = ({ curriculum, repos }) => {

	console.log(repos)
	return (
		<section
			id="howItWorks"
			className="container text-center py-24 sm:py-32"
		>
			<h2 className="text-3xl md:text-4xl font-bold ">
				How It{" "}
				<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
					Works{" "}
				</span>
				Step-by-Step Guide
			</h2>
			<p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
				dolor pariatur sit!
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

				<Card className="bg-muted/50">
					<CardHeader>
						<CardTitle className="grid gap-4 place-items-center">
							<FaGithub className="w-12 h-12" />
							<a href={curriculum.github}>Repositórios Públicos no Github</a>
						</CardTitle>
					</CardHeader>
					<CardContent>Com <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">{repos?.folower?.length || 0}</span> <i>followers</i> e mantendo <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">{repos?.github?.length || 0}</span> repositórios públicos, contribuindo com a comunidade e fomentando o open source</CardContent>
				</Card>
				<Card className="bg-muted/50"> 
					<CardHeader>
						<CardTitle className="grid gap-4 place-items-center">
							<SiNuget className="w-12 h-12" />
							<a href={curriculum.github}>Pacotes Nuget | C#</a>
						</CardTitle>
					</CardHeader>
					<CardContent>
						Num total de <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">{repos?.NugetLibs?.data?.[0]?.totalDownloads || 0}</span> downloads distribuídos entre meus <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">{repos?.nugetProfile?.data?.length || 0}</span> pacotes no NuGet, promovendo reutilização de código e contribuindo com a comunidade .NET.
					</CardContent>
				</Card>
			</div>
		</section>
	);
};
