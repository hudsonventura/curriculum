import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { Curriculum } from "./Curriculum";
import { LogoIcon } from "./Icons";
import { SiGmail } from "react-icons/si";

export const Footer = ({ curriculum, strings }: { curriculum: Curriculum, strings: StringsHandler }) => {
	return (
		<footer id="footer">
			<hr className="w-11/12 mx-auto" />

			<section className="container py-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-x-12 gap-y-8">


				<div className="flex flex-col gap-2">
					<h3 className="font-bold text-lg">{strings[13]}</h3>
					<div className="flex items-center"><a target="_blank" href={curriculum.github} ><FaGithub className="inline-block w-5 h-5 mr-2" /></a><span className="truncate">{curriculum.github}</span></div>
					<div className="flex items-center"><a target="_blank" href={curriculum.linkedin}><FaLinkedin className="inline-block w-5 h-5 mr-2" /></a><span className="truncate">{curriculum.linkedin}</span></div>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="font-bold text-lg">{strings[14]}</h3>
					<div className="flex items-center"><a target="_blank" href={`https://api.whatsapp.com/send?phone=${curriculum.phone}&text=Hi there, I would like to talk to you!`} ><FaWhatsapp className="inline-block w-5 h-5 mr-2" /></a><span className="truncate">{curriculum.phone}</span></div>
					<div className="flex items-center"><a target="_blank" href={`mailto:${curriculum.email}`}><SiGmail className="inline-block w-5 h-5 mr-2" /></a><span className="truncate">{curriculum.email}</span></div>
				</div>


			</section>

			<section className="container pb-14 text-center">
				<h3>
					&copy; {new Date().getFullYear()} Page made by{" "}
					<a className="text-primary transition-all border-primary hover:border-b-2">
						{curriculum.name}
					</a>
				</h3>
				<p className="text-sm text-muted-foreground mt-1">Credits to <a href="https://github.com/leoMirandaa" target="_blank" className="underline">Leo Miranda</a></p>
			</section>
		</footer>
	);
};
