import React, { useState, type FormEvent } from 'react';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!formData.fullname || !formData.email || !formData.message) return;

        setIsSubmitting(true);
        // Simulate form submission or use EmailJS here if package is installed
        // For now, just logging as per plan
        console.log('Form submitted:', formData);

        // Simulate network request
        setTimeout(() => {
            setIsSubmitting(false);
            setFormData({ fullname: '', email: '', message: '' });
            alert('Message sent successfully!');
        }, 1000);
    };

    const isValid = formData.fullname && formData.email && formData.message;

    return (
        <article className="contact active" data-page="contact">
            <header>
                <h2 className="h2 article-title">Contact</h2>
            </header>

            <section className="mapbox" data-mapbox>
                <figure>
                    <iframe
                        src="https://www.google.com/maps?q=Bhavnagar,+Gujarat,+India&output=embed"
                        width="400"
                        height="300"
                        loading="lazy"
                        title="Map showing Bhavnagar, Gujarat, India"
                    ></iframe>
                </figure>
            </section>

            <section className="contact-form">
                <h3 className="h3 form-title">Contact Form</h3>

                <form action="#" className="form" data-form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="fullname"
                            className="form-input"
                            placeholder="Full Name"
                            required
                            data-form-input
                            value={formData.fullname}
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="Email Address"
                            required
                            data-form-input
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <textarea
                        name="message"
                        className="form-input"
                        placeholder="Your Message"
                        required
                        data-form-input
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>

                    <button className="form-btn" type="submit" disabled={!isValid || isSubmitting} data-form-btn>
                        <ion-icon name="paper-plane"></ion-icon>
                        <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    </button>
                </form>
            </section>
        </article>
    );
};

export default Contact;
