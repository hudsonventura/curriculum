import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	const resolvedTheme = theme === "system"
		? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
		: theme;

	const toogleTheme = () => {
		if (resolvedTheme === "light") {
			setTheme("dark");
		} else {
			setTheme("light");
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
