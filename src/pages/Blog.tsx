import React, { useState } from 'react';
import BlogModal from '../components/modals/BlogModal';

interface BlogPost {
    title: string;
    category: string;
    date: string;
    image: string;
    description: string;
}

interface BlogProps {
    blog: {
        posts: BlogPost[];
    };
}

const Blog: React.FC<BlogProps> = ({ blog }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    const openModal = (post: BlogPost) => {
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
                    {blog.posts.map((post, index) => {
                        const date = new Date(post.date);
                        const formattedDate = isNaN(date.getTime())
                            ? post.date
                            : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                        return (
                            <li className="blog-post-item" key={index}>
                                <a href="#" onClick={(e) => { e.preventDefault(); openModal(post); }}>
                                    <figure className="blog-banner-box">
                                        <img src={post.image} alt={post.title} loading="lazy" />
                                    </figure>
                                    <div className="blog-content">
                                        <div className="blog-meta">
                                            <p className="blog-category">{post.category}</p>
                                            <span className="dot"></span>
                                            <time dateTime={post.date}>{formattedDate}</time>
                                        </div>
                                        <h3 className="h3 blog-item-title">{post.title}</h3>
                                        <p className="blog-text">{post.description}</p>
                                    </div>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </section>

            <BlogModal isOpen={modalOpen} onClose={closeModal} post={selectedPost} />
        </article>
    );
};

export default Blog;
