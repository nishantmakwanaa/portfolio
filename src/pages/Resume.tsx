import React from 'react';

interface Education {
    title: string;
    period: string;
    description: string;
    link?: string;
}

interface Experience {
    title: string;
    period: string;
    description: string;
    link?: string;
}

interface Certification {
    title: string;
    issuer: string;
    period: string;
    description: string;
    link?: string;
}

interface Language {
    language: string;
    proficiency: string;
}

interface Honor {
    title: string;
    issuer: string;
    period: string;
    description: string;
    link?: string;
}

interface SkillCategory {
    category: string;
    items: string[];
}

interface ResumeProps {
    resume: {
        education: Education[];
        experience: Experience[];
        certifications: Certification[];
        languages: Language[];
        honors: Honor[];
        skills: SkillCategory[];
    };
}

const Resume: React.FC<ResumeProps> = ({ resume }) => {
    return (
        <article className="resume active" data-page="resume">
            <header>
                <div className="header-row">
                    <h2 className="h2 article-title">Resume</h2>
                    {/* Assuming download link is static or passed in props, using # for now as per original */}
                    <a
                        id="download-resume-btn"
                        className="btn btn-primary"
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Download Resume"
                    >
                        <ion-icon name="arrow-up-outline" class="visit-arrow"></ion-icon>
                        <span>Download Resume</span>
                    </a>
                </div>
            </header>

            <section className="timeline">
                <div className="title-wrapper">
                    <div className="icon-box">
                        <ion-icon name="book-outline"></ion-icon>
                    </div>
                    <h3 className="h3">Education</h3>
                </div>
                <ol className="timeline-list">
                    {resume.education.map((item, index) => (
                        <li className="timeline-item" key={index} onClick={() => item.link && window.open(item.link, '_blank')}>
                            <h4 className="h4 timeline-item-title">
                                {item.title}
                                {item.link && <ion-icon class="visit-arrow" name="arrow-up-outline" aria-hidden="true"></ion-icon>}
                            </h4>
                            <span>{item.period}</span>
                            <p className="timeline-text">{item.description}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="timeline">
                <div className="title-wrapper">
                    <div className="icon-box">
                        <ion-icon name="book-outline"></ion-icon>
                    </div>
                    <h3 className="h3">Experience</h3>
                </div>
                <ol className="timeline-list">
                    {resume.experience.map((item, index) => (
                        <li className="timeline-item" key={index} onClick={() => item.link && window.open(item.link, '_blank')}>
                            <h4 className="h4 timeline-item-title">
                                {item.title}
                                {item.link && <ion-icon class="visit-arrow" name="arrow-up-outline" aria-hidden="true"></ion-icon>}
                            </h4>
                            <span>{item.period}</span>
                            <p className="timeline-text">{item.description}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="timeline">
                <div className="title-wrapper">
                    <div className="icon-box">
                        <ion-icon name="ribbon-outline"></ion-icon>
                    </div>
                    <h3 className="h3">Certifications</h3>
                </div>
                <ol className="timeline-list">
                    {resume.certifications.map((item, index) => (
                        <li className="timeline-item" key={index} onClick={() => item.link && window.open(item.link, '_blank')}>
                            <h4 className="h4 timeline-item-title">
                                {item.title}
                                {item.link && <ion-icon class="visit-arrow" name="arrow-up-outline" aria-hidden="true"></ion-icon>}
                            </h4>
                            <span>{item.period}</span>
                            <p className="timeline-text">{item.description}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="timeline">
                <div className="title-wrapper">
                    <div className="icon-box">
                        <ion-icon name="language-outline"></ion-icon>
                    </div>
                    <h3 className="h3">Languages</h3>
                </div>
                <ol className="timeline-list">
                    {resume.languages.map((item, index) => (
                        <li className="timeline-item" key={index}>
                            <h4 className="h4 timeline-item-title">{item.language}</h4>
                            <span>{item.proficiency}</span>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="timeline">
                <div className="title-wrapper">
                    <div className="icon-box">
                        <ion-icon name="trophy-outline"></ion-icon>
                    </div>
                    <h3 className="h3">Honors & Awards</h3>
                </div>
                <ol className="timeline-list">
                    {resume.honors.map((item, index) => (
                        <li className="timeline-item" key={index} onClick={() => item.link && window.open(item.link, '_blank')}>
                            <h4 className="h4 timeline-item-title">
                                {item.title}
                                {item.link && <ion-icon class="visit-arrow" name="arrow-up-outline" aria-hidden="true"></ion-icon>}
                            </h4>
                            <span>{item.period}</span>
                            <p className="timeline-text">{item.description}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="skill">
                <h3 className="h3 skills-title">My Skills</h3>
                <ul className="skills-list content-card">
                    {resume.skills.map((skillCategory, categoryIndex) => (
                        <React.Fragment key={categoryIndex}>
                            <li className="skills-item">
                                <div className="title-wrapper">
                                    <h4 className="h4">{skillCategory.category}</h4>
                                </div>
                            </li>
                            {skillCategory.items.map((skill, itemIndex) => (
                                <li className="skills-item" key={`${categoryIndex}-${itemIndex}`}>
                                    <div className="title-wrapper">
                                        <h5 className="h5">{skill}</h5>
                                    </div>
                                </li>
                            ))}
                        </React.Fragment>
                    ))}
                </ul>
            </section>
        </article>
    );
};

export default Resume;
