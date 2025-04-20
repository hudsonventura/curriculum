import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export function ModeToggle() {
	const { setTheme } = useTheme();

	const [internalTheme, setInternalTheme] = useState("light");
	const toogleTheme = () => {
		if(internalTheme === "light"){
			setTheme("dark");
			setInternalTheme("dark");

		}
		if (internalTheme === "dark") {
			setTheme("light");
			setInternalTheme("light");
		}
	};

	return (
		<>

			<Button
				variant="ghost"
				size="icon"
				className="ghost"
				onClick={() => toogleTheme()}
			>
				<Sun className="h-[1.1rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<Moon className="absolute h-[1.1rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				<span className="sr-only">Toggle theme</span>
			</Button>

		</>
	);
}
