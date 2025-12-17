import React from 'react';

interface BlogPost {
    title: string;
    category: string;
    date: string;
    image: string;
    description: string;
    linkedinUrl?: string;
}

interface BlogModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: BlogPost | null;
}

const BlogModal: React.FC<BlogModalProps> = ({ isOpen, onClose, post }) => {
    if (!isOpen || !post) return null;

    const date = new Date(post.date);
    const formattedDate = isNaN(date.getTime())
        ? post.date
        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <div className={`modal-container ${isOpen ? 'active' : ''}`} data-blog-modal>
            <div className={`overlay ${isOpen ? 'active' : ''}`} data-blog-overlay onClick={onClose}></div>
            <section className="blog-read-modal">
                <button className="modal-close-btn" data-blog-close-btn aria-label="Close modal" onClick={onClose}>
                    <ion-icon name="close-outline"></ion-icon>
                </button>
                <figure className="blog-read-banner">
                    <img src={post.image} alt={post.title} loading="lazy" data-blog-read-img />
                </figure>
                <div className="blog-read-content">
                    <h3 className="h3" data-blog-read-title>
                        {post.title}
                    </h3>
                    <div className="blog-read-meta" data-blog-read-meta>
                        <time dateTime={post.date}>{formattedDate}</time>
                    </div>
                    <p className="blog-read-text" data-blog-read-text>
                        {post.description}
                    </p>
                    {post.linkedinUrl && (
                        <a
                            href={post.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{ marginTop: '1rem', display: 'inline-block' }}
                        >
                            <ion-icon name="logo-linkedin"></ion-icon>
                            <span>View on LinkedIn</span>
                        </a>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BlogModal;
