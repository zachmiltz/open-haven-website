import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const styles: Record<string, string> = {
  foundation: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  dao: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
  "single-company": "bg-warning/20 text-warning-foreground border-warning/30",
  "open-standard-body": "bg-primary/10 text-primary border-primary/20",
  community: "bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20",
}

const labels: Record<string, string> = {
  foundation: "Foundation",
  dao: "DAO",
  "single-company": "Single Company",
  "open-standard-body": "Open Standard",
  community: "Community",
}

export function GovernanceBadge({ model }: { model: string }) {
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-normal", styles[model] ?? "bg-muted text-muted-foreground")}
    >
      {labels[model] ?? model}
    </Badge>
  )
}
