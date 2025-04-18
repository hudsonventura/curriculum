import { Curriculum } from "./Curriculum";
import { LogoIcon } from "./Icons";

export const Footer = ({ curriculum }: Curriculum) => {
	return (
		<footer id="footer">
			<hr className="w-11/12 mx-auto" />

			<section className="container py-20 grid grid-cols-2 md:grid-cols- xl:grid-cols-4 gap-x-12 gap-y-8">


				<div className="flex flex-col gap-2">
					<h3 className="font-bold text-lg">Mídias Sociais</h3>
					<div>
						<a
							rel="noreferrer noopener"
							href={curriculum.github}
							className="opacity-60 hover:opacity-100"
						>
							Github
						</a>
					</div>


					<div>
						<a
							rel="noreferrer noopener"
							href={curriculum.linkedin}
							className="opacity-60 hover:opacity-100"
						>
							LinkedIn
						</a>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="font-bold text-lg">Platforms</h3>
					<div>

						Fone: {curriculum.phone}

					</div>

					<div>

						Email: {curriculum.email}

					</div>


				</div>


			</section>

			<section className="container pb-14 text-center">
				<h3>
					&copy; {new Date().getFullYear()} Page made by{" "}
					<a className="text-primary transition-all border-primary hover:border-b-2">
						Hudson Ventura
					</a>
				</h3>
			</section>
		</footer>
	);
};
