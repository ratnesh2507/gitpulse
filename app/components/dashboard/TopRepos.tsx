"use client";

import { useState } from "react";
import { GithubRepo } from "@/types/github";
import { Star, GitFork, ExternalLink, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Go: "#00ADD8",
  Rust: "#dea584",
  C: "#555555",
  "C++": "#f34b7d",
};

type SortOption = "stars" | "forks" | "updated";

const sortOptions: {
  label: string;
  value: SortOption;
  icon: React.ReactNode;
}[] = [
  { label: "Updated", value: "updated", icon: <Clock size={13} /> },
  { label: "Stars", value: "stars", icon: <Star size={13} /> },
  { label: "Forks", value: "forks", icon: <GitFork size={13} /> },
];

type Props = {
  repos: GithubRepo[];
};

export default function TopRepos({ repos }: Props) {
  const [sortBy, setSortBy] = useState<SortOption>("stars");

  const sorted = [...repos]
    .sort((a, b) => {
      if (sortBy === "stars") return b.stargazers_count - a.stargazers_count;
      if (sortBy === "forks") return b.forks_count - a.forks_count;
      if (sortBy === "updated")
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      return 0;
    })
    .slice(0, 6);

  const timeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="p-6 rounded-2xl border border-[#30363d] bg-[#161b22]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white font-semibold">Top Repositories</h2>
          <p className="text-[#8b949e] text-sm mt-0.5">
            Sorted by{" "}
            {sortOptions.find((s) => s.value === sortBy)?.label.toLowerCase()}
          </p>
        </div>

        {/* Sort buttons */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-[#0d1117] border border-[#30363d]">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
                sortBy === option.value
                  ? "bg-[#238636] text-white"
                  : "text-[#8b949e] hover:text-white",
              )}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Repo grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sorted.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 p-4 rounded-xl border border-[#30363d] hover:border-[#238636] transition-all duration-200 bg-[#0d1117]"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-[#58a6ff] font-medium text-sm group-hover:text-[#3fb950] transition-colors truncate">
                {repo.name}
              </span>
              <ExternalLink
                size={14}
                className="text-[#8b949e] shrink-0 mt-0.5"
              />
            </div>
            {repo.description && (
              <p className="text-[#8b949e] text-xs line-clamp-2">
                {repo.description}
              </p>
            )}
            <div className="flex items-center gap-3 mt-auto pt-1 text-xs text-[#8b949e]">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        languageColors[repo.language] || "#8b949e",
                    }}
                  />
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star size={12} /> {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork size={12} /> {repo.forks_count}
              </span>
              <span className="flex items-center gap-1 ml-auto">
                <Clock size={12} /> {timeAgo(repo.updated_at)}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
