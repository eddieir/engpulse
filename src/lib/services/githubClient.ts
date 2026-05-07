/**
 * GitHub API client — currently returns mock data.
 * Replace the mock returns with real Octokit/fetch calls once
 * GitHub OAuth is configured via GITHUB_TOKEN or OAuth flow.
 */

import {
  mockRepositories,
  mockPullRequests,
  mockIssues,
} from "@/lib/mock-data";
import type { Repository, PullRequest, Issue } from "@/types";

const GITHUB_API = "https://api.github.com";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchGitHub(path: string, token?: string) {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${GITHUB_API}${path}`, { headers });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

export async function getRepositories(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _org?: string
): Promise<Repository[]> {
  // TODO: Replace with real GitHub API call
  // const data = await fetchGitHub(`/orgs/${org}/repos`);
  // return data.map(transformRepo);
  return Promise.resolve(mockRepositories);
}

export async function getPullRequests(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _repo: string
): Promise<PullRequest[]> {
  // TODO: Replace with real GitHub API call
  // const data = await fetchGitHub(`/repos/${org}/${repo}/pulls?state=all&per_page=100`);
  // return data.map(transformPR);
  return Promise.resolve(
    mockPullRequests.filter((pr) => pr.repository === _repo)
  );
}

export async function getIssues(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _repo: string
): Promise<Issue[]> {
  // TODO: Replace with real GitHub API call
  // const data = await fetchGitHub(`/repos/${org}/${repo}/issues?state=all&per_page=100`);
  // return data.map(transformIssue);
  return Promise.resolve(mockIssues.filter((i) => i.repository === _repo));
}

export async function getCommits(_repo: string): Promise<unknown[]> {
  // TODO: Replace with real GitHub API call
  // const data = await fetchGitHub(`/repos/${org}/${repo}/commits?per_page=100`);
  return Promise.resolve([]);
}

export async function getReleases(_repo: string): Promise<unknown[]> {
  // TODO: Replace with real GitHub API call
  return Promise.resolve([]);
}

export async function getContributors(_repo: string): Promise<unknown[]> {
  // TODO: Replace with real GitHub API call
  return Promise.resolve([]);
}
