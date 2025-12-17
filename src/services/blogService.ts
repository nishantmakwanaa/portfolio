import { transformLinkedInPostsToBlogPosts } from './linkedinService';
import type { LinkedInPostConfig } from './linkedinService';
import blogsConfig from '../config/blogsConfig.json';
import { cacheBlogs, getCachedBlogs } from './cacheService';

export interface BlogConfig {
  posts: LinkedInPostConfig[];
}

export interface BlogPost {
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
  linkedinUrl?: string;
}

/**
 * Loads blog posts from LinkedIn based on configuration
 * Date is automatically fetched from LinkedIn posts
 * Uses caching to optimize performance
 */
export async function loadBlogsFromLinkedIn(): Promise<BlogPost[]> {
  try {
    // Check cache first
    const cached = getCachedBlogs();
    if (cached) {
      console.log('Loading blogs from cache');
      return cached as BlogPost[];
    }

    console.log('Fetching blogs from LinkedIn...');
    const config = blogsConfig as BlogConfig;
    const posts = await transformLinkedInPostsToBlogPosts(config.posts);
    
    // Cache the results
    cacheBlogs(posts);
    
    return posts;
  } catch (error) {
    console.error('Error loading blogs from LinkedIn:', error);
    // Try to return cached data even on error
    const cached = getCachedBlogs();
    if (cached) {
      console.log('Returning cached blogs due to error');
      return cached as BlogPost[];
    }
    return [];
  }
}

