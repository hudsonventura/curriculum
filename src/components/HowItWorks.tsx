import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../components/Icons";
import { FaGithub } from "react-icons/fa6";
import { SiNuget } from "react-icons/si";
import { FaPython } from "react-icons/fa";





export const HowItWorks = ({ curriculum, repos }) => {


	return (
		<section
			id="howItWorks"
			className="container text-center py-24 sm:py-32"
		>
			<h2 className="text-3xl md:text-4xl font-bold ">
				Minhas{" "}
				<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
					contribuições{" "}
				</span>
			</h2>
			<p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
				Contribuo ativamente com a comunidade de desenvolvedores por meio da publicação de bibliotecas no PyPI e no NuGet. Essas libs foram criadas para resolver desafios reais do dia a dia e são voltadas à reutilização, produtividade e boas práticas. Compartilhar soluções em forma de pacotes públicos me permite não apenas apoiar outros desenvolvedores, mas também aprender continuamente com o feedback da comunidade e evoluir minhas próprias habilidades.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

				<Card className="bg-muted/80">
					<CardHeader>
						<CardTitle className="grid gap-4 place-items-center">
							<FaGithub className="w-12 h-12" />
							<a href={curriculum.github}>Repositórios Públicos no Github</a>
						</CardTitle>
					</CardHeader>
					<CardContent>Com <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">{repos?.folower?.length || 0}</span> <i>followers</i> e mantendo <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">{repos?.github?.length || 0}</span> repositórios públicos, contribuindo com a comunidade e fomentando o open source</CardContent>
				</Card>
				<Card className="bg-muted/80"> 
					<CardHeader>
						<CardTitle className="grid gap-4 place-items-center">
							<SiNuget className="w-12 h-12 text-[#0078d7]" />
							<a href={curriculum.nuget} target="_blank">Pacotes Nuget | C#</a>
						</CardTitle>
					</CardHeader>
					<CardContent>
						Num total de <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">{repos?.nugetLibs?.data?.[0]?.totalDownloads || 0}</span> downloads distribuídos entre meus <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">{repos?.nugetProfile?.data?.length || 0}</span> pacotes no NuGet, promovendo reutilização de código e contribuindo com a comunidade .NET.
					</CardContent>
				</Card>
				<Card className="bg-muted/80"> 
					<CardHeader>
						<CardTitle className="grid gap-4 place-items-center">
							<img src="https://www.python.org/static/favicon.ico" className="w-12 h-12" alt="Python Logo" />
							<a href={curriculum.pypi} target="_blank">Pacotes Pypi | Python</a>
						</CardTitle>
					</CardHeader> 
					<CardContent>
					Contribuo com a comunidade Python publicando pacotes no PyPI e incentivando o compartilhamento de soluções, em apoio a comunidade Python. <s>Infelizmente o Pypi não tem uma API de contagem de downloads e pacotes 😬</s>
					</CardContent>
				</Card>
			</div>
		</section>
	);
};
