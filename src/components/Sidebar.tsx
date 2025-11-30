import React, { useState } from 'react';

interface PersonalInfo {
    name: string;
    title: string;
    avatar: string;
    email: string;
    phone: string;
    birthday: string;
    location: string;
    resumeUrl?: string;
}

interface SocialLink {
    name: string;
    url: string;
    icon: string;
}

interface SidebarProps {
    personalInfo: PersonalInfo;
    socialLinks: SocialLink[];
}

const Sidebar: React.FC<SidebarProps> = ({ personalInfo, socialLinks }) => {
    const [isActive, setIsActive] = useState(false);

    const toggleSidebar = () => {
        setIsActive(!isActive);
    };

    return (
        <aside className={`sidebar ${isActive ? 'active' : ''}`} data-sidebar>
            <div className="sidebar-info">
                <figure className="avatar-box">
                    <img src={personalInfo.avatar} alt={personalInfo.name} width="80" />
                </figure>

                <div className="info-content">
                    <h1 className="name" title={personalInfo.name}>
                        {personalInfo.name}
                    </h1>
                    <p className="title">{personalInfo.title}</p>
                </div>

                <button className="info_more-btn" data-sidebar-btn onClick={toggleSidebar}>
                    <span>Let's Connect</span>
                    <ion-icon name="chevron-down"></ion-icon>
                </button>
            </div>

            <div className="sidebar-info_more">
                <div className="separator"></div>

                <ul className="contacts-list">
                    <li className="contact-item email-item">
                        <div className="icon-box">
                            <ion-icon name="mail-outline"></ion-icon>
                        </div>
                        <div className="contact-info">
                            <p className="contact-title">E-Mail</p>
                            <a href={`mailto:${personalInfo.email}`} className="contact-link">
                                {personalInfo.email}
                            </a>
                        </div>
                    </li>

                    <li className="contact-item">
                        <div className="icon-box">
                            <ion-icon name="phone-portrait-outline"></ion-icon>
                        </div>
                        <div className="contact-info">
                            <p className="contact-title">Phone</p>
                            <a href={`tel:${personalInfo.phone}`} className="contact-link">
                                {personalInfo.phone}
                            </a>
                        </div>
                    </li>

                    <li className="contact-item">
                        <div className="icon-box">
                            <ion-icon name="calendar-outline"></ion-icon>
                        </div>
                        <div className="contact-info">
                            <p className="contact-title">Birthday</p>
                            <time dateTime={personalInfo.birthday}>{personalInfo.birthday}</time>
                        </div>
                    </li>

                    <li className="contact-item">
                        <div className="icon-box">
                            <ion-icon name="location-outline"></ion-icon>
                        </div>
                        <div className="contact-info">
                            <p className="contact-title">Location</p>
                            <address>{personalInfo.location}</address>
                        </div>
                    </li>
                </ul>

                <div className="separator"></div>

                <ul className="social-list">
                    {socialLinks.map((link, index) => (
                        <li className="social-item" key={index}>
                            <a
                                href={link.url}
                                className="social-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ion-icon name={link.icon}></ion-icon>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
