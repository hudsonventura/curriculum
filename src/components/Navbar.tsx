import { useState } from "react";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "./Icons";
import { Curriculum } from "./Curriculum";
import { RiPrinterLine } from "react-icons/ri";

import { IoPersonCircle } from "react-icons/io5";






export const Navbar = ({ curriculum, strings }: { curriculum: Curriculum, strings: any }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
			<NavigationMenu className="mx-auto">
				<NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
					<NavigationMenuItem className="font-bold flex">
						<a
							rel="noreferrer noopener"
							href="/"
							className="ml-2 font-bold text-xl flex"
						>
							<IoPersonCircle className="h-7 w-7" />
							{curriculum.name}
						</a>
					</NavigationMenuItem>

					{/* mobile */}
					<span className="flex md:hidden">
						<ModeToggle />

						<Sheet
							open={isOpen}
							onOpenChange={setIsOpen}
						>
							<SheetTrigger className="px-2">
								<Menu
									className="flex md:hidden h-5 w-5"
									onClick={() => setIsOpen(true)}
								>
									<span className="sr-only">Menu Icon</span>
								</Menu>
							</SheetTrigger>

							<SheetContent side={"left"}>
								<SheetHeader>
									<SheetTitle className="font-bold text-xl">
										{curriculum.name}
									</SheetTitle>
								</SheetHeader>
								<nav className="flex flex-col justify-center items-center gap-2 mt-4">
								<a
									rel="noreferrer noopener"
									href="#about"
									className={`text-[17px] ${buttonVariants({
										variant: "ghost",
									})}`}
								>
									{strings.strings[0]}
								</a>

								<a
									rel="noreferrer noopener"
									href="#howItWorks"
									className={`text-[17px] ${buttonVariants({
										variant: "ghost",
									})}`}
								>
									{strings.strings[1]}
								</a>

								<a
									rel="noreferrer noopener"
									href="#cta"
									className={`text-[17px] ${buttonVariants({
										variant: "ghost",
									})}`}
								>
									{strings.strings[2]}
								</a>

								<a
									rel="noreferrer noopener"
									href="#testimonials"
									className={`text-[17px] ${buttonVariants({
										variant: "ghost",
									})}`}
								>
									{strings.strings[3]}
								</a>

								<a
									rel="noreferrer noopener"
									href="#footer"
									className={`text-[17px] ${buttonVariants({
										variant: "ghost",
									})}`}
								>
									{strings.strings[4]}
								</a>

									<a
										rel="noreferrer noopener"
										href="https://github.com/leoMirandaa/shadcn-landing-page.git"
										target="_blank"
										className={`w-[110px] border ${buttonVariants({
											variant: "secondary",
										})}`}
									>
										<GitHubLogoIcon className="mr-2 w-5 h-5" />
										Github
									</a>
								</nav>
							</SheetContent>
						</Sheet>
					</span>

					{/* desktop */}
					<nav className="hidden md:flex gap-2">
						
							<a
								rel="noreferrer noopener"
								href="#about"
								className={`text-[17px] ${buttonVariants({
									variant: "ghost",
								})}`}
							>
								{strings.strings[0]}
							</a>

							<a
								rel="noreferrer noopener"
								href="#howItWorks"
								className={`text-[17px] ${buttonVariants({
									variant: "ghost",
								})}`}
							>
								{strings.strings[1]}
							</a>

							<a
								rel="noreferrer noopener"
								href="#cta"
								className={`text-[17px] ${buttonVariants({
									variant: "ghost",
								})}`}
							>
								{strings.strings[2]}
							</a>

							<a
								rel="noreferrer noopener"
								href="#testimonials"
								className={`text-[17px] ${buttonVariants({
									variant: "ghost",
								})}`}
							>
								{strings.strings[3]}
							</a>

							<a
								rel="noreferrer noopener"
								href="#footer"
								className={`text-[17px] ${buttonVariants({
									variant: "ghost",
								})}`}
							>
								{strings.strings[4]}
							</a>

						
					</nav>

					<div className="hidden md:flex gap-2">
						<a
							rel="noreferrer noopener"
							href="/Print"
							target="_blank"
							className={`border ${buttonVariants({ variant: "secondary" })}`}
						>
							<RiPrinterLine className="mr-2 w-5 h-5" />
							Imprimir
						</a>

						<ModeToggle />
					</div>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
};
