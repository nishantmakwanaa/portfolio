import { fetchGitHubRepos, transformReposToProjects } from './githubService';
import type { Project as GitHubProject, GitHubRepo } from './githubService';

export type Project = GitHubProject;
import projectsConfig from '../config/projectsConfig.json';

export interface ProjectConfig {
  repoName: string;
  customName?: string;
  category?: string;
  enabled: boolean;
}

export interface ProjectsConfig {
  githubUsername: string;
  defaultCategory: string;
  projects: ProjectConfig[];
}

/**
 * Loads projects from GitHub based on configuration
 */
export async function loadProjectsFromGitHub(): Promise<Project[]> {
  try {
    const config = projectsConfig as ProjectsConfig;
    const repos = await fetchGitHubRepos(config.githubUsername);
    
    if (repos.length === 0) {
      console.warn('No repositories found or failed to fetch');
      return [];
    }
    
    const projects = transformReposToProjects(repos, config.projects, config.defaultCategory);
    return projects;
  } catch (error) {
    console.error('Error loading projects from GitHub:', error);
    return [];
  }
}

/**
 * Gets all available repos for selection
 */
export async function getAvailableRepos(): Promise<GitHubRepo[]> {
  try {
    const config = projectsConfig as ProjectsConfig;
    return await fetchGitHubRepos(config.githubUsername);
  } catch (error) {
    console.error('Error fetching available repos:', error);
    return [];
  }
}

