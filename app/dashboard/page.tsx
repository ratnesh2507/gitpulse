import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  getGithubUser,
  getGithubRepos,
  getGithubEvents,
  computeLanguageStats,
  computeActivityByDay,
  computeRepoScore,
} from "@/lib/github";
import DashboardClient from "@/app/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  const [user, repos, events] = await Promise.all([
    getGithubUser(session.accessToken),
    getGithubRepos(session.accessToken),
    getGithubEvents(session.user.username, session.accessToken),
  ]);

  const languageStats = computeLanguageStats(repos);
  const activityData = computeActivityByDay(events);
  const profileScore = computeRepoScore(repos);

  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  return (
    <DashboardClient
      user={user}
      repos={repos}
      topRepos={topRepos}
      languageStats={languageStats}
      activityData={activityData}
      profileScore={profileScore}
    />
  );
}
