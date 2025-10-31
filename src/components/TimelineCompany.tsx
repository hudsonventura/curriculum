"use client"
import { cn } from "@/lib/utils"
import { Company, Roles } from "./Curriculum"




export function TimelineCompany({ items }: { items: Company[] }) {
	return (
		<div className={cn("space-y-8")}>
			{items.map((item: Company, index: number) => (
				<div key={index} className="relative pl-8 pb-4">
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
								{item.roles.map((role: Roles, index: number) => (
									<div key={index} className="relative pl-4">
										<div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-muted-foreground" />
										<div>
											<h4 className="font-semibold text-base">{role.role}</h4>
											<p className="text-sm text-muted-foreground">
												{new Date(role.start).getFullYear()} - {typeof role.end === 'string' ? role.end : new Date(role.end).getFullYear()}
											</p>
											<div className="text-sm">{role.description_full}</div>
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
