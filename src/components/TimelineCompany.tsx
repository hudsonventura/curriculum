"use client"
import { cn } from "@/lib/utils"
import { Company } from "./Curriculum"

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

export function TimelineCompany({ items, className }: Company) {
	return (
		<div className={cn("space-y-8", className)}>
			{items.map((item, index) => (
				<div key={item.id} className="relative pl-8 pb-4">
					{index !== items.length - 1 && <div className="absolute left-3 top-6 bottom-0 w-px bg-border" />}
					<div className="absolute left-0 top-1 w-6 h-6 rounded-full border-2 border-primary bg-background flex items-center justify-center">
						<div className="w-2 h-2 rounded-full bg-primary" />
					</div>
					<div className="space-y-1">
						<div>
							<h3 className="font-bold text-xl">{item.name}</h3>
						</div>

						{/* Render subitems if they exist */}
						{item.roles && item.roles.length > 0 && (
							<div className="mt-4 space-y-3 pl-4 border-l border-dashed border-border">
								{item.roles.map((role, index) => (
									<div key={index} className="relative pl-4">
										<div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-muted-foreground" />
										<div>
											<h4 className="font-semibold text-base">{role.role}</h4>
											<p className="text-xs text-muted-foreground mb-1">{role.start}</p>
											<div className="text-sm text-muted-foreground">{role.description}</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	)
}
