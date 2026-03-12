export type GithubUser = {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
  location: string;
  blog: string;
  company: string;
};

export type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  visibility: string;
  fork: boolean;
};

export type GithubEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
};

export type LanguageStats = {
  [language: string]: number;
};
