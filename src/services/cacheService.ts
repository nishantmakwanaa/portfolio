/**
 * Simple cache service for API responses
 * Uses localStorage for persistence across page refreshes
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number; // milliseconds
}

const CACHE_DURATION = {
  PROJECTS: 30 * 60 * 1000, // 30 minutes (increased for better performance)
  BLOGS: 10 * 60 * 1000, // 10 minutes
};

export class CacheService {
  private static getCacheKey(key: string): string {
    return `portfolio_cache_${key}`;
  }

  static set<T>(key: string, data: T, expiry: number): void {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        expiry,
      };
      localStorage.setItem(this.getCacheKey(key), JSON.stringify(entry));
    } catch (error) {
      console.warn('Failed to set cache:', error);
    }
  }

  static get<T>(key: string): T | null {
    try {
      const cached = localStorage.getItem(this.getCacheKey(key));
      if (!cached) return null;

      const entry: CacheEntry<T> = JSON.parse(cached);
      const now = Date.now();
      const age = now - entry.timestamp;

      if (age > entry.expiry) {
        // Cache expired
        localStorage.removeItem(this.getCacheKey(key));
        return null;
      }

      return entry.data;
    } catch (error) {
      console.warn('Failed to get cache:', error);
      return null;
    }
  }

  static clear(key: string): void {
    try {
      localStorage.removeItem(this.getCacheKey(key));
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }

  static clearAll(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith('portfolio_cache_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear all cache:', error);
    }
  }
}

// Cache keys
export const CACHE_KEYS = {
  PROJECTS: 'projects',
  BLOGS: 'blogs',
};

// Helper functions for common cache operations
export const cacheProjects = (data: any) => {
  CacheService.set(CACHE_KEYS.PROJECTS, data, CACHE_DURATION.PROJECTS);
};

export const getCachedProjects = () => {
  return CacheService.get(CACHE_KEYS.PROJECTS);
};

export const cacheBlogs = (data: any) => {
  CacheService.set(CACHE_KEYS.BLOGS, data, CACHE_DURATION.BLOGS);
};

export const getCachedBlogs = () => {
  return CacheService.get(CACHE_KEYS.BLOGS);
};

