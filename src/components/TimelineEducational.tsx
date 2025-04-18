"use client"
import { cn } from "@/lib/utils"
import { Education } from "./Curriculum"

export interface TimelineItem {
	id: string | number
	heading: string
	subtitle?: string // Texto secundário para o título
	date: string
	content: string
	subitems?: SubItem[]
}

export interface SubItem {
	id: string | number
	heading: string
	content: string
	date: string
}

interface TimelineProps {
	items: TimelineItem[]
	className?: string
}

export function TimelineEducational({ items}: Education) {
	return (
		<div className={cn("space-y-8")}>
			{items.map((item, index) => (
				<div key={item.id} className="relative pl-8 pb-4">
					{index !== items.length - 1 && <div className="absolute left-3 top-6 bottom-0 w-px bg-border" />}
					<div className="absolute left-0 top-1 w-6 h-6 rounded-full border-2 border-primary bg-background flex items-center justify-center">
						<div className="w-2 h-2 rounded-full bg-primary" />
					</div>
					<div className="space-y-1">
						<div>
							<h3 className="font-bold text-xl">{item.degree}</h3>
							<p className="text-muted-foreground">{item.school}</p>
						</div>
						<p className="text-sm text-muted-foreground">Formatura em {new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(item.end))}</p>
						<div className="text-sm leading-relaxed">{item.description}</div>
					</div>
				</div>
			))}
		</div>
	)
}
