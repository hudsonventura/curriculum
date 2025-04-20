import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FaGithub } from "react-icons/fa6";
import { SiNuget } from "react-icons/si";
import { Curriculum } from "./Curriculum";
import StringsHandler from "./StringsHandler";





export const HowItWorks = ({ curriculum, strings, repos}: { curriculum: Curriculum, strings: StringsHandler, repos: any }) => {

	const templateNuget = strings[27];
	const phraseNuget = templateNuget.replace("{TOTALDOWNLOADS}", repos?.nugetLibs?.data?.[0]?.totalDownloads || 0)
									 .replace("{NUMPACKAGES}", repos?.nugetProfile?.data?.length || 0);

	const templateGithub = strings[28];
	const phraseGithub = templateGithub.replace("{TOTALFOLOWERS}", repos?.folower?.length || 0)
									.replace("{NUMREPOSITORIES}", repos?.github?.length || 0);



	return (
		<section
			id="howItWorks"
			className="container text-center py-24 sm:py-32"
		>
			<h2 className="text-3xl md:text-4xl font-bold ">
				{strings[21]}{" "}
				<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
					{strings[22]}{" "}
				</span>
			</h2>
			<p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
				{strings[23]}
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

				<Card className="bg-muted/80">
					<CardHeader>
						<CardTitle className="grid gap-4 place-items-center">
							<FaGithub className="w-12 h-12" />
							<a href={curriculum.github}>{strings[24]}</a>
						</CardTitle>
					</CardHeader>
					<CardContent>{phraseGithub}</CardContent>
				</Card>
				<Card className="bg-muted/80"> 
					<CardHeader>
						<CardTitle className="grid gap-4 place-items-center">
							<SiNuget className="w-12 h-12 text-[#0078d7]" />
							<a href={curriculum.nuget} target="_blank">{strings[29]}</a>
						</CardTitle>
					</CardHeader>
					<CardContent>
						{
							phraseNuget
						}
						
					</CardContent>
				</Card>
				<Card className="bg-muted/80"> 
					<CardHeader>
						<CardTitle className="grid gap-4 place-items-center">
							<img src="https://www.python.org/static/favicon.ico" className="w-12 h-12" alt="Python Logo" />
							<a href={curriculum.pypi} target="_blank">{strings[30]}</a>
						</CardTitle>
					</CardHeader> 
					<CardContent>
						{strings[25]} <s>{strings[26]}</s>
					</CardContent>
				</Card>
			</div>
		</section>
	);
};
