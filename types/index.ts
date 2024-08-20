export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  updated_at: string;
}

export interface RepositoryStats {
  stars: number[];
  forks: number[];
  dates: string[];
}
