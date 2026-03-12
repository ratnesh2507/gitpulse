import { GithubRepo } from "@/types/github";
import { Star, GitFork, ExternalLink } from "lucide-react";

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

type Props = {
  repos: GithubRepo[];
};

export default function TopRepos({ repos }: Props) {
  return (
    <div className="p-6 rounded-2xl border border-[#30363d] bg-[#161b22]">
      <h2 className="text-white font-semibold mb-1">Top Repositories</h2>
      <p className="text-[#8b949e] text-sm mb-6">Sorted by stars</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {repos.map((repo) => (
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
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
