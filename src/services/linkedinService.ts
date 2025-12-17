export interface LinkedInPostData {
  title: string;
  description: string;
  image: string;
  url: string;
  date?: string;
}

export interface LinkedInPostConfig {
  title: string;
  linkedinUrl: string;
  enabled: boolean;
}

/**
 * Fetches metadata from a LinkedIn post URL
 * Uses Open Graph meta tags via CORS proxy
 * 
 * Note: LinkedIn has strict CORS policies, so we use a proxy service
 * For production, consider using a backend service for better reliability
 */
export async function fetchLinkedInPostData(url: string): Promise<LinkedInPostData | null> {
  try {
    console.log('Fetching LinkedIn post data for:', url);
    
    // Method 1: Try multiple CORS proxy services with better error handling
    const proxies = [
      {
        name: 'allorigins',
        url: `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
        parser: (data: any) => data.contents || data
      },
      {
        name: 'corsproxy',
        url: `https://corsproxy.io/?${encodeURIComponent(url)}`,
        parser: (data: any) => typeof data === 'string' ? data : data.toString()
      },
      {
        name: 'codetabs',
        url: `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
        parser: (data: any) => data
      },
      {
        name: 'cors-anywhere',
        url: `https://cors-anywhere.herokuapp.com/${url}`,
        parser: (data: any) => typeof data === 'string' ? data : data.toString()
      },
    ];
    
    let htmlContent = '';
    let lastError: Error | null = null;
    
    // Try each proxy until one works
    for (const proxy of proxies) {
      try {
        console.log(`Trying proxy: ${proxy.name}`);
        const response = await fetch(proxy.url, {
          method: 'GET',
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        // Try to get text first, then JSON
        const contentType = response.headers.get('content-type') || '';
        let data: any;
        
        if (contentType.includes('application/json')) {
          data = await response.json();
          htmlContent = proxy.parser(data);
        } else {
          htmlContent = await response.text();
        }
        
        if (htmlContent && htmlContent.length > 100) {
          console.log(`Successfully fetched HTML from ${proxy.name}, length: ${htmlContent.length}`);
          break; // Success, exit loop
        }
      } catch (error) {
        console.warn(`Proxy ${proxy.name} failed:`, error);
        lastError = error as Error;
        continue; // Try next proxy
      }
    }
    
    if (!htmlContent || htmlContent.length < 100) {
      console.error('All proxy services failed or returned empty content');
      throw lastError || new Error('All proxy services failed');
    }
    
    // Parse Open Graph meta tags from HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Extract Open Graph meta tags with multiple fallbacks
    const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || 
                    doc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') || 
                    doc.querySelector('title')?.textContent || '';
    const ogDescription = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || 
                          doc.querySelector('meta[name="twitter:description"]')?.getAttribute('content') || 
                          doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || 
                    doc.querySelector('meta[property="og:image:secure_url"]')?.getAttribute('content') ||
                    doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content') || 
                    doc.querySelector('meta[name="twitter:image:src"]')?.getAttribute('content') || '';
    const ogUrl = doc.querySelector('meta[property="og:url"]')?.getAttribute('content') || url;
    
    // Extract date if available - try multiple sources
    const articlePublishedTime = doc.querySelector('meta[property="article:published_time"]')?.getAttribute('content') ||
                                 doc.querySelector('meta[property="article:published"]')?.getAttribute('content') ||
                                 doc.querySelector('time[datetime]')?.getAttribute('datetime') ||
                                 doc.querySelector('meta[name="publish_date"]')?.getAttribute('content');
    
    // Try to extract date from URL if available (LinkedIn posts sometimes have timestamps in URL)
    let extractedDate = articlePublishedTime;
    if (!extractedDate && url) {
      // LinkedIn activity URLs sometimes contain timestamps
      // Format: activity-{timestamp} or activity-{timestamp}-{suffix}
      const timestampMatch = url.match(/activity-(\d{10,})/);
      if (timestampMatch) {
        const timestampStr = timestampMatch[1];
        // Check if it's milliseconds (13+ digits) or seconds (10 digits)
        if (timestampStr.length >= 13) {
          // Milliseconds timestamp
          const timestamp = parseInt(timestampStr.substring(0, 13));
          if (timestamp > 0) {
            extractedDate = new Date(timestamp).toISOString();
          }
        } else if (timestampStr.length === 10) {
          // Seconds timestamp
          const timestamp = parseInt(timestampStr) * 1000;
          if (timestamp > 0) {
            extractedDate = new Date(timestamp).toISOString();
          }
        }
      }
    }
    
    console.log('Extracted data:', {
      title: ogTitle.substring(0, 50),
      description: ogDescription.substring(0, 50),
      image: ogImage ? 'Found' : 'Not found',
      date: extractedDate ? 'Found' : 'Not found',
      url: ogUrl
    });
    
    // If no image found, try to use a screenshot service as fallback
    let finalImage = ogImage;
    if (!finalImage && url) {
      // Use screenshot service as fallback for LinkedIn posts
      finalImage = `https://image.thum.io/get/width/1280/crop/720/noanimate/${url}`;
      console.log('Using screenshot service as fallback for image');
    }
    
    return {
      title: ogTitle,
      description: ogDescription,
      image: finalImage,
      url: ogUrl,
      date: extractedDate || undefined,
    };
  } catch (error) {
    console.error('Error fetching LinkedIn post data:', error);
    // Return null to allow fallback behavior
    return null;
  }
}

/**
 * Alternative method: Fetch LinkedIn post data using a backend proxy
 * This is more reliable but requires a backend service
 */
export async function fetchLinkedInPostDataAlternative(_url: string): Promise<LinkedInPostData | null> {
  try {
    // This would require a backend service that can:
    // 1. Access LinkedIn without CORS restrictions
    // 2. Parse the post content
    // 3. Return structured data
    
    // For now, return null - user can implement their own backend
    console.warn('Alternative LinkedIn fetch method requires backend service');
    return null;
  } catch (error) {
    console.error('Error fetching LinkedIn post data (alternative):', error);
    return null;
  }
}

/**
 * Transforms LinkedIn post configs to blog posts
 * Date is automatically fetched from LinkedIn post
 */
export async function transformLinkedInPostsToBlogPosts(
  configs: LinkedInPostConfig[]
): Promise<Array<{
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
  linkedinUrl?: string;
}>> {
  const posts = [];
  
  for (const config of configs) {
    if (!config.enabled) continue;
    
    try {
      const postData = await fetchLinkedInPostData(config.linkedinUrl);
      
      if (postData) {
        // Use screenshot service as fallback if LinkedIn image is not available
        let imageUrl = postData.image || '';
        if (!imageUrl && config.linkedinUrl) {
          // Use screenshot service for LinkedIn post
          imageUrl = `https://image.thum.io/get/width/1280/crop/720/noanimate/${config.linkedinUrl}`;
          console.log(`Using screenshot service for post: ${config.title}`);
        }
        
        // Always use date from LinkedIn post, fallback to current date if not available
        const postDate = postData.date || new Date().toISOString();
        
        posts.push({
          title: config.title, // Use custom title from config
          category: 'LinkedIn Post', // Default category
          date: postDate, // Always use date from LinkedIn post
          image: imageUrl,
          description: postData.description || '',
          linkedinUrl: config.linkedinUrl,
        });
      } else {
        // If fetch fails, use screenshot service for image
        let fallbackImage = '';
        if (config.linkedinUrl) {
          fallbackImage = `https://image.thum.io/get/width/1280/crop/720/noanimate/${config.linkedinUrl}`;
          console.log(`Using screenshot service as fallback for post: ${config.title}`);
        }
        
        // If fetch fails, create a post with minimal data
        // Try to extract date from URL or use current date
        const postDate = new Date().toISOString();
        
        posts.push({
          title: config.title,
          category: 'LinkedIn Post',
          date: postDate,
          image: fallbackImage,
          description: 'Click to view on LinkedIn',
          linkedinUrl: config.linkedinUrl,
        });
      }
    } catch (error) {
      console.error(`Error processing LinkedIn post ${config.title}:`, error);
      // Still add the post with screenshot service as fallback
      let fallbackImage = '';
      if (config.linkedinUrl) {
        fallbackImage = `https://image.thum.io/get/width/1280/crop/720/noanimate/${config.linkedinUrl}`;
      }
      
      posts.push({
        title: config.title,
        category: 'LinkedIn Post',
        date: new Date().toISOString(),
        image: fallbackImage,
        description: 'Click to view on LinkedIn',
        linkedinUrl: config.linkedinUrl,
      });
    }
  }
  
  return posts;
}

