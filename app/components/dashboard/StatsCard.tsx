import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: "green" | "blue" | "yellow" | "purple";
};

const colorMap = {
  green: "text-[#3fb950] bg-[#238636]/10 border-[#238636]/30",
  blue: "text-[#58a6ff] bg-[#1f6feb]/10 border-[#1f6feb]/30",
  yellow: "text-[#e3b341] bg-[#e3b341]/10 border-[#e3b341]/30",
  purple: "text-[#bc8cff] bg-[#8957e5]/10 border-[#8957e5]/30",
};

export default function StatsCard({ label, value, icon, color }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 p-5 rounded-2xl border bg-[#161b22]",
        colorMap[color],
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[#8b949e] text-sm">{label}</span>
        <span className={cn("p-2 rounded-lg bg-current/10", colorMap[color])}>
          {icon}
        </span>
      </div>
      <span className="text-3xl font-bold text-white">
        {value.toLocaleString()}
      </span>
    </div>
  );
}
