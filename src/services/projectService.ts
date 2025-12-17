import { fetchGitHubRepos, transformReposToProjects } from './githubService';
import type { Project as GitHubProject, GitHubRepo } from './githubService';
import projectsConfig from '../config/projectsConfig.json';
import { cacheProjects, getCachedProjects } from './cacheService';

export type Project = GitHubProject;

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
 * Uses caching to optimize performance
 */
export async function loadProjectsFromGitHub(): Promise<Project[]> {
  try {
    // Check cache first - but allow background refresh
    const cached = getCachedProjects();
    if (cached) {
      console.log('Loading projects from cache');
      // Return cached immediately, but still refresh in background
      // This is handled by the component
    }

    console.log('Fetching projects from GitHub...');
    const config = projectsConfig as ProjectsConfig;
    const repos = await fetchGitHubRepos(config.githubUsername);
    
    if (repos.length === 0) {
      console.warn('No repositories found or failed to fetch');
      // Return cached if available
      const cached = getCachedProjects();
      if (cached) {
        return cached as Project[];
      }
      return [];
    }
    
    const projects = transformReposToProjects(repos, config.projects, config.defaultCategory);
    
    // Cache the results
    cacheProjects(projects);
    
    return projects;
  } catch (error) {
    console.error('Error loading projects from GitHub:', error);
    // Try to return cached data even on error
    const cached = getCachedProjects();
    if (cached) {
      console.log('Returning cached projects due to error');
      return cached as Project[];
    }
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

