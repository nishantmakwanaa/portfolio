export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  updated_at: string;
}

export interface ProjectConfig {
  repoName: string;
  customName?: string;
  category?: string;
  enabled: boolean;
}

export interface Project {
  title: string;
  category: string;
  image: string;
  liveUrl?: string;
  githubUrl: string;
  description?: string;
}

/**
 * Fetches all repositories for a GitHub username
 */
export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch repos: ${response.statusText}`);
    }
    
    const repos: GitHubRepo[] = await response.json();
    return repos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

/**
 * Gets screenshot URL for a website
 * Using multiple free screenshot API services as fallbacks
 * 
 * Note: Some services may require API keys. For production use, consider:
 * - screenshotapi.net (free tier available)
 * - api.screenshotmachine.com (free tier available)
 * - Or host your own screenshot service
 * 
 * The current implementation uses free services that don't require API keys.
 * For production, you may want to get an API key for better reliability.
 */
export function getScreenshotUrl(url: string): string {
  if (!url) return '';
  
  // Ensure URL has protocol
  let fullUrl = url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    fullUrl = `https://${url}`;
  }
  
  // Using image.thum.io - a reliable free service that works well
  // This service doesn't require API keys and works for most websites
  // Note: May have rate limits but works without authentication
  return `https://image.thum.io/get/width/1280/crop/720/noanimate/${fullUrl}`;
  
  // Alternative services (uncomment if primary doesn't work):
  // Note: You'll need to encode the URL for these services
  // const encodedUrl = encodeURIComponent(fullUrl);
  
  // Option 2: Using api.screenshotlayer.com (may require API key for production)
  // return `https://api.screenshotlayer.com/api/capture?access_key=demo&url=${encodedUrl}&viewport=1280x720&width=1280&format=png`;
  
  // Option 3: Using screenshot.website (free, no API key)
  // return `https://screenshot.website/api/v1/screenshot?url=${encodedUrl}&width=1280&height=720&full_page=false&format=png`;
  
  // Option 4: Using api.screenshotone.com (requires free API key from https://screenshotone.com)
  // Get a free API key and replace 'YOUR_KEY' below
  // return `https://api.screenshotone.com/take?access_key=YOUR_KEY&url=${encodedUrl}&viewport_width=1280&viewport_height=720&device_scale_factor=1&format=png&image_quality=80&delay=2&block_ads=true&block_cookie_banners=true`;
  
  // Option 5: screenshotapi.net (requires free API key from https://screenshotapi.net)
  // return `https://shot.screenshotapi.net/screenshot?token=YOUR_TOKEN&url=${encodedUrl}&width=1280&height=720&output=image&file_type=png&wait_for_event=load`;
  
  // Option 6: screenshotmachine.com (requires free API key from https://screenshotmachine.com)
  // return `https://api.screenshotmachine.com/?key=YOUR_KEY&url=${encodedUrl}&dimension=1280x720&format=png&cacheLimit=0`;
}

/**
 * Transforms GitHub repos to projects based on configuration
 */
export function transformReposToProjects(
  repos: GitHubRepo[],
  projectConfigs: ProjectConfig[],
  defaultCategory: string = 'Web Development'
): Project[] {
  const projects: Project[] = [];
  
  // Create a map of repo names to configs for quick lookup
  const configMap = new Map<string, ProjectConfig>();
  projectConfigs.forEach(config => {
    configMap.set(config.repoName, config);
  });
  
  repos.forEach(repo => {
    const config = configMap.get(repo.name);
    
    // Only include repos that are enabled in config
    if (config && config.enabled) {
      const project: Project = {
        title: config.customName || repo.name,
        category: config.category || defaultCategory,
        image: repo.homepage ? getScreenshotUrl(repo.homepage) : '',
        liveUrl: repo.homepage || undefined,
        githubUrl: repo.html_url,
        description: repo.description || undefined,
      };
      
      projects.push(project);
    }
  });
  
  return projects;
}

