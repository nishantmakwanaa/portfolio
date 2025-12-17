import React, { useState, useEffect } from 'react';
import BlogModal from '../components/modals/BlogModal';
import { loadBlogsFromLinkedIn } from '../services/blogService';

interface BlogPost {
    title: string;
    category: string;
    date: string;
    image: string;
    description: string;
    linkedinUrl?: string;
}

interface BlogProps {
    blog?: {
        posts: BlogPost[];
    };
}

const Blog: React.FC<BlogProps> = ({ blog: blogProp }) => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    // Load posts from LinkedIn on mount
    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            try {
                // Try to load from LinkedIn first
                const linkedInPosts = await loadBlogsFromLinkedIn();
                
                if (linkedInPosts.length > 0) {
                    setPosts(linkedInPosts);
                } else if (blogProp?.posts) {
                    // Fallback to prop data if LinkedIn fetch fails
                    setPosts(blogProp.posts);
                }
            } catch (error) {
                console.error('Error loading blog posts:', error);
                // Fallback to prop data on error
                if (blogProp?.posts) {
                    setPosts(blogProp.posts);
                }
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, [blogProp]);

    const openModal = (post: BlogPost) => {
        // If post has LinkedIn URL, open it directly instead of modal
        if (post.linkedinUrl) {
            window.open(post.linkedinUrl, '_blank', 'noopener,noreferrer');
            return;
        }
        setSelectedPost(post);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedPost(null);
    };

    return (
        <article className="blog active" data-page="blogs">
            <header>
                <h2 className="h2 article-title">Blogs</h2>
            </header>

            <section className="blog-posts">
                <ul className="blog-posts-list">
                    {loading ? (
                        // Skeleton loading screens for better UX
                        Array.from({ length: 4 }).map((_, index) => (
                            <li className="blog-post-item" key={`skeleton-${index}`} style={{ opacity: 0.6 }}>
                                <figure className="blog-banner-box" style={{ 
                                    backgroundColor: 'var(--bg-color-2)', 
                                    minHeight: '200px',
                                    borderRadius: '8px',
                                    animation: 'pulse 1.5s ease-in-out infinite'
                                }}>
                                    <div style={{ width: '100%', height: '100%', minHeight: '200px' }}></div>
                                </figure>
                                <div className="blog-content">
                                    <div className="blog-meta" style={{ 
                                        backgroundColor: 'var(--bg-color-2)', 
                                        width: '100px', 
                                        height: '20px',
                                        borderRadius: '4px',
                                        marginBottom: '10px'
                                    }}></div>
                                    <h3 className="h3 blog-item-title" style={{ 
                                        backgroundColor: 'var(--bg-color-2)', 
                                        width: '80%', 
                                        height: '24px',
                                        borderRadius: '4px',
                                        marginBottom: '10px'
                                    }}></h3>
                                    <p className="blog-text" style={{ 
                                        backgroundColor: 'var(--bg-color-2)', 
                                        width: '100%', 
                                        height: '60px',
                                        borderRadius: '4px'
                                    }}></p>
                                </div>
                            </li>
                        ))
                    ) : posts.length > 0 ? (
                        posts.map((post, index) => {
                            const date = new Date(post.date);
                            const formattedDate = isNaN(date.getTime())
                                ? post.date
                                : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                            return (
                                <li className="blog-post-item" key={`${post.linkedinUrl || post.title}-${index}`}>
                                    <a 
                                        href={post.linkedinUrl || '#'} 
                                        onClick={(e) => { 
                                            e.preventDefault(); 
                                            openModal(post); 
                                        }}
                                        target={post.linkedinUrl ? '_blank' : undefined}
                                        rel={post.linkedinUrl ? 'noopener noreferrer' : undefined}
                                    >
                                        <figure className="blog-banner-box">
                                            <img 
                                                src={post.image || 'https://via.placeholder.com/400x300?text=LinkedIn+Post'} 
                                                alt={post.title} 
                                                loading="lazy"
                                                decoding="async"
                                                fetchPriority={index < 2 ? "high" : "low"}
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    console.warn('Failed to load blog image:', post.image, 'for post:', post.title);
                                                    // If it's a screenshot service URL, try alternative
                                                    if (post.image && post.image.includes('image.thum.io')) {
                                                        // Try alternative screenshot service
                                                        const altUrl = `https://api.screenshotlayer.com/api/capture?access_key=demo&url=${encodeURIComponent(post.linkedinUrl || '')}&viewport=1280x720&width=1280&format=png`;
                                                        target.src = altUrl;
                                                    } else {
                                                        target.src = 'https://via.placeholder.com/400x300?text=LinkedIn+Post';
                                                    }
                                                }}
                                                onLoad={() => {
                                                    console.log('Successfully loaded image for blog post:', post.title);
                                                }}
                                            />
                                        </figure>
                                        <div className="blog-content">
                                            <div className="blog-meta">
                                                <time dateTime={post.date}>{formattedDate}</time>
                                            </div>
                                            <h3 className="h3 blog-item-title">{post.title}</h3>
                                            <p className="blog-text">
                                                {post.description 
                                                    ? post.description.split(' ').slice(0, 8).join(' ') + (post.description.split(' ').length > 8 ? '...' : '')
                                                    : 'Click to view on LinkedIn'}
                                            </p>
                                            {post.linkedinUrl && (
                                                <button 
                                                    className="btn btn-primary"
                                                    style={{ 
                                                        marginTop: '1rem',
                                                        padding: '0.5rem 1rem',
                                                        fontSize: '0.9rem',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        window.open(post.linkedinUrl, '_blank', 'noopener,noreferrer');
                                                    }}
                                                >
                                                    <ion-icon name="open-outline"></ion-icon>
                                                    <span>View Full Blog</span>
                                                </button>
                                            )}
                                        </div>
                                    </a>
                                </li>
                            );
                        })
                    ) : (
                        <li className="blog-post-item">
                            <h3 className="h3" style={{ color: 'var(--white-2)' }}>
                                No posts found. Please configure your LinkedIn posts in src/config/blogsConfig.json
                            </h3>
                        </li>
                    )}
                </ul>
            </section>

            <BlogModal isOpen={modalOpen} onClose={closeModal} post={selectedPost} />
        </article>
    );
};

export default Blog;
