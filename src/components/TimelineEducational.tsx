"use client"
import { cn } from "@/lib/utils"
import { Education } from "./Curriculum"



export function TimelineEducational({ items }: { items: Education[] }) {
	return (
		<div className={cn("space-y-8")}>
			{items.map((item: Education, index: number) => (
				<div key={index} className="relative pl-8 pb-4">
					{index !== items.length - 1 && <div className="absolute left-3 top-6 bottom-0 w-px bg-border" />}
					<div className="absolute left-0 top-1 w-6 h-6 rounded-full border-2 border-primary bg-background flex items-center justify-center">
						<div className="w-2 h-2 rounded-full bg-primary" />
					</div>
					<div className="space-y-1">
						<div>
							<h3 className="font-bold text-xl">{item.degree}</h3>
							<p className="text-muted-foreground">{item.school}</p>
						</div>
						<p className="text-sm text-muted-foreground">{new Date(item.start).getFullYear()} - {new Date(item.end).getFullYear()}</p>
						<div className="text-sm leading-relaxed">{item.description_full}</div>
					</div>
				</div>
			))}
		</div>
	)
}
