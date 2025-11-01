import { FaGithub, FaLinkedin, FaWhatsapp, FaTelegram } from "react-icons/fa6";
import { Curriculum } from "./Curriculum";
import { FaCopy, FaCheck, FaEnvelope } from "react-icons/fa";
import StringsHandler from "./StringsHandler";
import { useState } from "react";

export const Footer = ({ curriculum, strings }: { curriculum: Curriculum, strings: StringsHandler }) => {
	const [copiedItem, setCopiedItem] = useState<string | null>(null);

	const handleCopy = (text: string, itemId: string) => {
		navigator.clipboard.writeText(text);
		setCopiedItem(itemId);
		
		setTimeout(() => {
			setCopiedItem(null);
		}, 2000);
	};

	return (
		<footer id="footer">
			<hr className="w-11/12 mx-auto" />

			<section className="container py-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-x-12 gap-y-8">


				<div className="flex flex-col gap-2">
					<h3 className="font-bold text-lg">{(strings as any)[13]}</h3>
					<div className="flex items-center gap-2">
						<a target="_blank" href={curriculum.github} className="flex items-center"><FaGithub className="inline-block w-5 h-5 mr-2" />{curriculum.github}</a>
						{copiedItem === 'github' ? (
							<FaCheck className="w-4 h-4 text-green-500 transition-colors" title="Copied!" />
						) : (
							<FaCopy className="w-4 h-4 cursor-pointer hover:text-primary transition-colors" onClick={() => handleCopy(curriculum.github, 'github')} title="Copy to clipboard" />
						)}
					</div> 
					<div className="flex items-center gap-2">
						<a target="_blank" href={curriculum.linkedin} className="flex items-center"><FaLinkedin className="inline-block w-5 h-5 mr-2" />{curriculum.linkedin}</a>
						{copiedItem === 'linkedin' ? (
							<FaCheck className="w-4 h-4 text-green-500 transition-colors" title="Copied!" />
						) : (
							<FaCopy className="w-4 h-4 cursor-pointer hover:text-primary transition-colors" onClick={() => handleCopy(curriculum.linkedin, 'linkedin')} title="Copy to clipboard" />
						)}
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="font-bold text-lg">{(strings as any)[14]}</h3>
					<div className="flex items-center gap-2">
						<a target="_blank" href={`https://api.whatsapp.com/send?phone=${curriculum.phone}&text=Hi there, I would like to talk to you!`} className="flex items-center"><FaWhatsapp className="inline-block w-5 h-5 mr-2" /><span className="truncate">WhatsApp: {curriculum.phone}</span></a>
						{copiedItem === 'phone' ? (
							<FaCheck className="w-4 h-4 text-green-500 transition-colors" title="Copied!" />
						) : (
							<FaCopy className="w-4 h-4 cursor-pointer hover:text-primary transition-colors flex-shrink-0" onClick={() => handleCopy(curriculum.phone, 'phone')} title="Copy to clipboard" />
						)}
					</div>
					<div className="flex items-center gap-2">
						<a target="_blank" href={`https://t.me/${curriculum.phone}`} className="flex items-center"><FaTelegram className="inline-block w-5 h-5 mr-2" /><span className="truncate">Telegram: {curriculum.phone}</span></a>
						{copiedItem === 'telegram' ? (
							<FaCheck className="w-4 h-4 text-green-500 transition-colors" title="Copied!" />
						) : (
							<FaCopy className="w-4 h-4 cursor-pointer hover:text-primary transition-colors flex-shrink-0" onClick={() => handleCopy(curriculum.phone, 'telegram')} title="Copy to clipboard" />
						)}
					</div>
					<div className="flex items-center gap-2">
						<a target="_blank" href={`mailto:${curriculum.email}`} className="flex items-center"><FaEnvelope className="inline-block w-5 h-5 mr-2" /><span className="truncate">{curriculum.email}</span></a>
						{copiedItem === 'email' ? (
							<FaCheck className="w-4 h-4 text-green-500 transition-colors" title="Copied!" />
						) : (
							<FaCopy className="w-4 h-4 cursor-pointer hover:text-primary transition-colors flex-shrink-0" onClick={() => handleCopy(curriculum.email, 'email')} title="Copy to clipboard" />
						)}
					</div>
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
