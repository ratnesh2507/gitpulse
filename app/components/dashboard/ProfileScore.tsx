"use client";

type Props = {
  score: number;
};

function getScoreLabel(score: number) {
  if (score >= 80) return { label: "Excellent", color: "#3fb950" };
  if (score >= 60) return { label: "Strong", color: "#58a6ff" };
  if (score >= 40) return { label: "Good", color: "#e3b341" };
  return { label: "Growing", color: "#bc8cff" };
}

export default function ProfileScore({ score }: Props) {
  const { label, color } = getScoreLabel(score);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="p-6 rounded-2xl border border-[#30363d] bg-[#161b22] h-full flex flex-col items-center justify-center">
      <h2 className="text-white font-semibold mb-1 self-start">
        Profile Score
      </h2>
      <p className="text-[#8b949e] text-sm mb-6 self-start">
        Based on stars, forks & activity
      </p>
      <div className="relative flex items-center justify-center">
        <svg width="140" height="140" className="-rotate-90">
          <circle
            cx="70"
            cy="70"
            r="54"
            fill="none"
            stroke="#21262d"
            strokeWidth="10"
          />
          <circle
            cx="70"
            cy="70"
            r="54"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold text-white">{score}</span>
          <span className="text-xs text-[#8b949e]">/ 100</span>
        </div>
      </div>
      <span
        className="mt-4 text-sm font-semibold px-3 py-1 rounded-full"
        style={{ color, backgroundColor: `${color}18` }}
      >
        {label}
      </span>
    </div>
  );
}
