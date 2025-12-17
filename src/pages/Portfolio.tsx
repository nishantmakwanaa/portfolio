import React, { useState, useEffect } from 'react';
import ProjectModal from '../components/modals/ProjectModal';
import { loadProjectsFromGitHub } from '../services/projectService';
import type { Project } from '../services/projectService';
import { getCachedProjects } from '../services/cacheService';

interface PortfolioProps {
    portfolio?: {
        categories: string[];
        projects: Project[];
    };
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolio: portfolioProp }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<string[]>(['All']);
    const [activeCategory, setActiveCategory] = useState('All');
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    // Load projects from GitHub on mount - optimized for performance
    useEffect(() => {
        const loadProjects = async () => {
            // First, try to load from cache immediately for instant display
            const cached = getCachedProjects();
            
            if (cached && Array.isArray(cached) && cached.length > 0) {
                // Show cached data immediately
                setProjects(cached as Project[]);
                const uniqueCategories = ['All', ...Array.from(new Set(cached.map((p: Project) => p.category)))];
                setCategories(uniqueCategories);
                setLoading(false);
                
                // Then load fresh data in background
                try {
                    const githubProjects = await loadProjectsFromGitHub();
                    if (githubProjects.length > 0) {
                        setProjects(githubProjects);
                        const freshCategories = ['All', ...Array.from(new Set(githubProjects.map(p => p.category)))];
                        setCategories(freshCategories);
                    }
                } catch (error) {
                    console.error('Error refreshing projects:', error);
                    // Keep cached data on error
                }
            } else {
                // No cache, load fresh data
                setLoading(true);
                try {
                    const githubProjects = await loadProjectsFromGitHub();
                    
                    if (githubProjects.length > 0) {
                        setProjects(githubProjects);
                        const uniqueCategories = ['All', ...Array.from(new Set(githubProjects.map(p => p.category)))];
                        setCategories(uniqueCategories);
                    } else if (portfolioProp?.projects) {
                        // Fallback to prop data if GitHub fetch fails
                        setProjects(portfolioProp.projects);
                        setCategories(portfolioProp.categories || ['All']);
                    }
                } catch (error) {
                    console.error('Error loading projects:', error);
                    // Fallback to prop data on error
                    if (portfolioProp?.projects) {
                        setProjects(portfolioProp.projects);
                        setCategories(portfolioProp.categories || ['All']);
                    }
                } finally {
                    setLoading(false);
                }
            }
        };

        loadProjects();
    }, [portfolioProp]);

    const filteredProjects =
        activeCategory === 'All'
            ? projects
            : projects.filter((project) => project.category === activeCategory);

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        setIsSelectOpen(false);
    };

    const openModal = (project: Project) => {
        setSelectedProject(project);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedProject(null);
    };

    return (
        <article className="portfolio active" data-page="portfolio">
            <header>
                <h2 className="h2 article-title">Portfolio</h2>
            </header>

            <section className="projects">
                {!loading && projects.length > 0 && categories.length > 1 && (
                    <>
                        <ul className="filter-list">
                            {categories.map((category) => (
                                <li className="filter-item" key={category}>
                                    <button
                                        className={activeCategory === category ? 'active' : ''}
                                        onClick={() => handleCategoryClick(category)}
                                        data-filter-btn
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="filter-select-box">
                            <button
                                className={`filter-select ${isSelectOpen ? 'active' : ''}`}
                                onClick={() => setIsSelectOpen(!isSelectOpen)}
                                data-select
                            >
                                <div className="select-value" data-selecct-value>
                                    {activeCategory === 'All' ? 'Select Category' : activeCategory}
                                </div>
                                <div className="select-icon">
                                    <ion-icon name="chevron-down"></ion-icon>
                                </div>
                            </button>

                            <ul className="select-list">
                                {categories.map((category) => (
                                    <li className="select-item" key={category}>
                                        <button onClick={() => handleCategoryClick(category)} data-select-item>
                                            {category}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}

                <ul className="project-list">
                    {loading ? (
                        <li className="project-item active">
                            <h3 className="h3" style={{ color: 'var(--white-2)' }}>Loading projects...</h3>
                        </li>
                    ) : filteredProjects.length > 0 ? (
                        filteredProjects.map((project, index) => (
                            <li
                                className="project-item active"
                                data-filter-item
                                data-category={project.category.toLowerCase()}
                                key={`${project.githubUrl}-${index}`}
                            >
                                <a href="#" onClick={(e) => { e.preventDefault(); openModal(project); }}>
                                    <figure className="project-img">
                                        <div className="project-item-icon-box">
                                            <ion-icon name="eye-outline"></ion-icon>
                                        </div>
                                        <img 
                                            src={project.image || 'https://via.placeholder.com/400x300?text=Project'} 
                                            alt={project.title} 
                                            loading="lazy"
                                            onError={(e) => {
                                                // Fallback to placeholder if image fails to load
                                                const target = e.target as HTMLImageElement;
                                                console.warn('Failed to load project image:', project.image, 'for project:', project.title);
                                                // Try alternative screenshot service if primary fails
                                                if (project.liveUrl && project.image && project.image.includes('image.thum.io')) {
                                                    // Try alternative service
                                                    const altUrl = `https://api.screenshotlayer.com/api/capture?access_key=demo&url=${encodeURIComponent(project.liveUrl)}&viewport=1280x720&width=1280&format=png`;
                                                    target.src = altUrl;
                                                } else {
                                                    target.src = 'https://via.placeholder.com/400x300?text=Project';
                                                }
                                            }}
                                            onLoad={() => {
                                                console.log('Successfully loaded image for project:', project.title);
                                            }}
                                        />
                                    </figure>
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-category">{project.category}</p>
                                </a>
                            </li>
                        ))
                    ) : (
                        <li className="project-item active">
                            <h3 className="h3" style={{ color: 'var(--white-2)' }}>No projects found. Please configure your projects in src/config/projectsConfig.json</h3>
                        </li>
                    )}
                </ul>
            </section>

            <ProjectModal isOpen={modalOpen} onClose={closeModal} project={selectedProject} />
        </article>
    );
};

export default Portfolio;
