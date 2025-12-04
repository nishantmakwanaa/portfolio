import React, { useState } from 'react';
import ProjectModal from '../components/modals/ProjectModal';

interface Project {
    title: string;
    category: string;
    image: string;
    liveUrl?: string;
    githubUrl?: string;
}

interface PortfolioProps {
    portfolio: {
        categories: string[];
        projects: Project[];
    };
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolio }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects =
        activeCategory === 'All'
            ? portfolio.projects
            : portfolio.projects.filter((project) => project.category === activeCategory);

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
                {portfolio.projects.length > 0 && (
                    <>
                        <ul className="filter-list">
                            {portfolio.categories.map((category) => (
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
                                {portfolio.categories.map((category) => (
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
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, index) => (
                            <li
                                className="project-item active"
                                data-filter-item
                                data-category={project.category.toLowerCase()}
                                key={index}
                            >
                                <a href="#" onClick={(e) => { e.preventDefault(); openModal(project); }}>
                                    <figure className="project-img">
                                        <div className="project-item-icon-box">
                                            <ion-icon name="eye-outline"></ion-icon>
                                        </div>
                                        <img src={project.image} alt={project.title} loading="lazy" />
                                    </figure>
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-category">{project.category}</p>
                                </a>
                            </li>
                        ))
                    ) : (
                        <li className="project-item active">
                            <h3 className="h3" style={{ color: 'var(--white-2)' }}>Coming Soon...</h3>
                        </li>
                    )}
                </ul>
            </section>

            <ProjectModal isOpen={modalOpen} onClose={closeModal} project={selectedProject} />
        </article>
    );
};

export default Portfolio;
