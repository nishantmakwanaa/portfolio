import React from 'react';

interface Project {
    title: string;
    category: string;
    image: string;
    liveUrl?: string;
    githubUrl?: string;
}

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
    if (!isOpen || !project) return null;

    return (
        <div className={`modal-container ${isOpen ? 'active' : ''}`} data-project-modal>
            <div className={`overlay ${isOpen ? 'active' : ''}`} data-project-overlay onClick={onClose}></div>
            <section className="quick-links-modal">
                <button className="modal-close-btn" data-project-close-btn aria-label="Close modal" onClick={onClose}>
                    <ion-icon name="close-outline"></ion-icon>
                </button>
                <div className="quick-links">
                    <a
                        className="btn btn-primary"
                        href={project.liveUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-live-link
                    >
                        <ion-icon name="open-outline"></ion-icon>
                        <span>Visit Site</span>
                    </a>
                    <a
                        className="btn btn-secondary"
                        href={project.githubUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-github-link
                    >
                        <ion-icon name="logo-github"></ion-icon>
                        <span>GitHub</span>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ProjectModal;
