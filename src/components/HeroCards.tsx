import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Curriculum } from "./Curriculum";

import { SiGmail } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa6";
import StringsHandler from "./StringsHandler";





export const HeroCards = ({ curriculum, strings }: { curriculum: Curriculum, strings: StringsHandler }) => {
	return (
		<div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
			{/* Testimonial */}
			{/* <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage
              alt=""
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">John Doe React</CardTitle>
            <CardDescription>@john_doe</CardDescription>
          </div>
        </CardHeader>

        <CardContent>This landing page is awesome!</CardContent>
      </Card> */}

			{/* Team */}
			<Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
				<CardHeader className="mt-8 flex justify-center items-center pb-2">
					<img
						src={curriculum.gravatar}
						alt="user avatar"
						className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
					/>
					<CardTitle className="text-center">{curriculum.name}</CardTitle>
					<CardDescription className="font-normal text-primary">
						{curriculum.role}
					</CardDescription>
				</CardHeader>

				<CardContent className="text-center pb-2">
					<p>
					{strings[6]}
					</p>
				</CardContent>

				<CardFooter>
					<div>
						<a
							rel="noreferrer noopener"
							href={curriculum.github}
							target="_blank"
							className={buttonVariants({
								variant: "ghost",
								size: "sm",
							})}
						>
							<span className="sr-only">Github icon</span>
							<GitHubLogoIcon className="w-5 h-5" />
						</a>
						

						<a
							rel="noreferrer noopener"
							href={curriculum.linkedin}
							target="_blank"
							className={buttonVariants({
								variant: "ghost",
								size: "sm",
							})}
						>
							<span className="sr-only">Linkedin icon</span>
							<Linkedin size="20" />
						</a>

						<a
							rel="noreferrer noopener"
							href={`mailto:${curriculum.email}`}
							target="_blank"
							className={buttonVariants({
								variant: "ghost",
								size: "sm",
							})}
						>
							<title>Clique para enviar um email para mim</title>
							<SiGmail className="w-5 h-5" />
						</a>

						<a
							rel="noreferrer noopener"
							href={`https://api.whatsapp.com/send?phone=${curriculum.phone}&text=Hi there, I would like to talk to you!`} 
							target="_blank"
							className={buttonVariants({
								variant: "ghost",
								size: "sm",
							})}
						>
							<title>Envelope</title>
							<FaWhatsapp className="w-5 h-5" />
						</a>
					</div>
				</CardFooter>
			</Card>

			{/* Pricing */}
			{/* <Card className="absolute top-[150px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            Free
            <Badge
              variant="secondary"
              className="text-sm text-primary"
            >
              Most popular
            </Badge>
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">$0</span>
            <span className="text-muted-foreground"> /month</span>
          </div>

          <CardDescription>
            Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full">Start Free Trial</Button>
        </CardContent>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {["4 Team member", "4 GB Storage", "Upto 6 pages"].map(
              (benefit: string) => (
                <span
                  key={benefit}
                  className="flex"
                >
                  <Check className="text-green-500" />{" "}
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              )
            )}
          </div>
        </CardFooter>
      </Card> */}

			{/* Service */}
			{/* <Card className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle>Light & dark mode</CardTitle>
            <CardDescription className="text-md mt-2">
              Lorem ipsum dolor sit amet consect adipisicing elit. Consectetur
              natusm.
            </CardDescription>
          </div>
        </CardHeader>
      </Card> */}
		</div>
	);
};
