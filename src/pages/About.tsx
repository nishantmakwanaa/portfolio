import React, { useState } from 'react';
import TestimonialsModal from '../components/modals/TestimonialsModal';

interface Service {
    title: string;
    description: string;
    icon: string;
}

interface Testimonial {
    company: string;
    description: string;
    logo: string;
}

interface Client {
    name: string;
    logo: string;
}

interface AboutProps {
    about: {
        description: string[];
        services: Service[];
    };
    testimonials: Testimonial[];
    clients: Client[];
}

const About: React.FC<AboutProps> = ({ about, testimonials, clients }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

    const openModal = (testimonial: Testimonial) => {
        setSelectedTestimonial(testimonial);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedTestimonial(null);
    };

    return (
        <article className="about active" data-page="about">
            <header>
                <h2 className="h2 article-title">About Me</h2>
            </header>

            <section className="about-text">
                {about.description.map((para, index) => (
                    <p key={index}>{para}</p>
                ))}
            </section>

            <section className="service">
                <h3 className="h3 service-title">What I'm Doing</h3>
                <ul className="service-list">
                    {about.services.map((service, index) => (
                        <li className="service-item" key={index}>
                            <div className="service-icon-box">
                                <img src={service.icon} alt={`${service.title} Icon`} width="40" />
                            </div>
                            <div className="service-content-box">
                                <h4 className="h4 service-item-title">{service.title}</h4>
                                <p className="service-item-text">{service.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="testimonials">
                <h3 className="h3 testimonials-title">Testimonials</h3>
                <ul className="testimonials-list has-scrollbar">
                    {testimonials.map((testimonial, index) => (
                        <li className="testimonials-item" key={index} onClick={() => openModal(testimonial)}>
                            <div className="content-card" data-testimonials-item>
                                <figure className="testimonials-avatar-box">
                                    <img src={testimonial.logo} alt={testimonial.company} width="60" data-testimonials-avatar />
                                </figure>
                                <h4 className="h4 testimonials-item-title" data-testimonials-title>
                                    {testimonial.company}
                                </h4>
                                <div className="testimonials-text" data-testimonials-text>
                                    <p>{testimonial.description}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <TestimonialsModal isOpen={modalOpen} onClose={closeModal} testimonial={selectedTestimonial} />

            <section className="clients">
                <h3 className="h3 clients-title">Clients</h3>
                <ul className="clients-list has-scrollbar">
                    {clients.map((client, index) => (
                        <li className="clients-item" key={index}>
                            <a href="#">
                                <img src={client.logo} alt={`${client.name} Logo`} />
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    );
};

export default About;
