"use client";

import { signOut } from "next-auth/react";
import { GithubUser, GithubRepo } from "@/types/github";
import StatsCard from "./StatsCard";
import LanguageChart from "./LanguageChart";
import ActivityChart from "./ActivityChart";
import TopRepos from "./TopRepos";
import ProfileScore from "./ProfileScore";
import {
  Users,
  GitFork,
  Star,
  BookOpen,
  LogOut,
  MapPin,
  Link as LinkIcon,
  Building2,
} from "lucide-react";

type Props = {
  user: GithubUser;
  repos: GithubRepo[];
  topRepos: GithubRepo[];
  languageStats: { name: string; count: number }[];
  activityData: { date: string; count: number }[];
  profileScore: number;
};

export default function DashboardClient({
  user,
  repos,
  languageStats,
  activityData,
  profileScore,
}: Props) {
  const totalStars = repos.reduce(
    (acc: number, r: GithubRepo) => acc + r.stargazers_count,
    0,
  );
  const totalForks = repos.reduce(
    (acc: number, r: GithubRepo) => acc + r.forks_count,
    0,
  );

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Navbar */}
      <nav className="border-b border-[#30363d] bg-[#161b22] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
          </svg>
          <span className="font-semibold text-lg">GitHub Analytics</span>
        </div>
        <div className="flex items-center gap-4">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-8 h-8 rounded-full border border-[#30363d]"
          />
          <span className="text-[#8b949e] text-sm hidden md:block">
            {user.login}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 text-[#8b949e] hover:text-white transition-colors text-sm"
          >
            <LogOut size={16} />
            <span className="hidden md:block">Sign out</span>
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
        {/* Profile header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-2xl border border-[#30363d] bg-[#161b22]">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-20 h-20 rounded-full border-2 border-[#238636]"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name || user.login}</h1>
            <p className="text-[#8b949e] text-sm mt-1">@{user.login}</p>
            {user.bio && (
              <p className="text-[#c9d1d9] mt-2 text-sm">{user.bio}</p>
            )}
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-[#8b949e]">
              {user.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {user.location}
                </span>
              )}
              {user.company && (
                <span className="flex items-center gap-1">
                  <Building2 size={14} /> {user.company}
                </span>
              )}
              {user.blog && (
                <a
                  href={user.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#3fb950] transition-colors"
                >
                  <LinkIcon size={14} /> {user.blog}
                </a>
              )}
            </div>
          </div>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg border border-[#30363d] text-sm hover:border-[#238636] hover:text-[#3fb950] transition-colors"
          >
            View on GitHub →
          </a>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard
            label="Repositories"
            value={user.public_repos}
            icon={<BookOpen size={20} />}
            color="green"
          />
          <StatsCard
            label="Followers"
            value={user.followers}
            icon={<Users size={20} />}
            color="blue"
          />
          <StatsCard
            label="Total Stars"
            value={totalStars}
            icon={<Star size={20} />}
            color="yellow"
          />
          <StatsCard
            label="Total Forks"
            value={totalForks}
            icon={<GitFork size={20} />}
            color="purple"
          />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <ActivityChart data={activityData} />
          </div>
          <div>
            <ProfileScore score={profileScore} />
          </div>
        </div>

        {/* Language chart + Top repos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <LanguageChart data={languageStats} />
          </div>
          <div className="md:col-span-2">
            <TopRepos repos={repos} />
          </div>
        </div>
      </div>
    </div>
  );
}
