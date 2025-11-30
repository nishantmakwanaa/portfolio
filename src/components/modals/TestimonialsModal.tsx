import React from 'react';

interface Testimonial {
    company: string;
    description: string;
    logo: string;
}

interface TestimonialsModalProps {
    isOpen: boolean;
    onClose: () => void;
    testimonial: Testimonial | null;
}

const TestimonialsModal: React.FC<TestimonialsModalProps> = ({ isOpen, onClose, testimonial }) => {
    if (!isOpen || !testimonial) return null;

    return (
        <div className={`modal-container ${isOpen ? 'active' : ''}`} data-modal-container>
            <div className={`overlay ${isOpen ? 'active' : ''}`} data-overlay onClick={onClose}></div>

            <section className="testimonials-modal">
                <button className="modal-close-btn" data-modal-close-btn aria-label="Close modal" onClick={onClose}>
                    <ion-icon name="close-outline"></ion-icon>
                </button>

                <div className="modal-img-wrapper">
                    <figure className="modal-avatar-box">
                        <img src={testimonial.logo} alt={testimonial.company} width="80" data-modal-img />
                    </figure>
                    <img src="./assets/images/icon-quote.svg" alt="quote icon" />
                </div>

                <div className="modal-content">
                    <h4 className="h3 modal-title" data-modal-title>
                        {testimonial.company}
                    </h4>
                    <div data-modal-text>
                        <p>{testimonial.description}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TestimonialsModal;
