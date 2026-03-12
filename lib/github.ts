const GITHUB_API = "https://api.github.com";

interface Repository {
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  language?: string;
}
async function githubFetch(url: string, accessToken: string) {
  const res = await fetch(`${GITHUB_API}${url}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
    next: { revalidate: 300 }, // cache for 5 minutes
  });

  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

export async function getGithubUser(accessToken: string) {
  return githubFetch("/user", accessToken);
}

export async function getGithubRepos(accessToken: string) {
  return githubFetch(
    "/user/repos?per_page=100&sort=updated&type=owner",
    accessToken,
  );
}

export async function getGithubEvents(username: string, accessToken: string) {
  return githubFetch(`/users/${username}/events?per_page=100`, accessToken);
}

export async function getContributionStats(
  username: string,
  accessToken: string,
) {
  return githubFetch(
    `/search/commits?q=author:${username}&per_page=100`,
    accessToken,
  );
}

export function computeLanguageStats(repos: Repository[]) {
  const stats: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) {
      stats[repo.language] = (stats[repo.language] || 0) + 1;
    }
  }
  // Sort by count descending
  return Object.entries(stats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }));
}

interface GitHubEvent {
  created_at: string;
}

export function computeActivityByDay(events: GitHubEvent[]) {
  const days: Record<string, number> = {};
  for (const event of events) {
    const date = new Date(event.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    days[date] = (days[date] || 0) + 1;
  }
  return Object.entries(days)
    .slice(-14) // last 14 days
    .map(([date, count]) => ({ date, count }));
}

export function computeRepoScore(repos: Repository[]) {
  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
  const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0);
  const hasTopics = repos.filter((r) => (r.topics?.length ?? 0) > 0).length;
  const score = Math.min(
    100,
    Math.round(
      totalStars * 2 + totalForks * 1.5 + hasTopics * 3 + repos.length * 0.5,
    ),
  );
  return score;
}
