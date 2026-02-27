import { cn } from "@/lib/utils"

const config = {
  low: { dot: "bg-green-500", label: "Low capture risk" },
  medium: { dot: "bg-yellow-500", label: "Medium capture risk" },
  high: { dot: "bg-red-500", label: "High capture risk" },
}

export function CaptureRiskIndicator({ risk }: { risk: "low" | "medium" | "high" }) {
  const { dot, label } = config[risk]
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className={cn("h-2 w-2 rounded-full", dot)} />
      {label}
    </span>
  )
}
