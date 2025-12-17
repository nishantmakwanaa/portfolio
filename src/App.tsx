import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import SEO from './components/SEO';
import About from './pages/About';
import Resume from './pages/Resume';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import mockData from './assets/mock-data.json';

function App() {
  // Initialize activePage from URL hash or localStorage, default to 'about'
  const getInitialPage = () => {
    // Check URL hash first
    if (window.location.hash) {
      const hash = window.location.hash.substring(1); // Remove #
      const validPages = ['about', 'resume', 'portfolio', 'blogs', 'contact'];
      if (validPages.includes(hash)) {
        return hash;
      }
    }
    // Check localStorage
    const savedPage = localStorage.getItem('activePage');
    if (savedPage) {
      const validPages = ['about', 'resume', 'portfolio', 'blogs', 'contact'];
      if (validPages.includes(savedPage)) {
        return savedPage;
      }
    }
    return 'about';
  };

  const [activePage, setActivePage] = useState(getInitialPage());

  // Update URL hash and localStorage when page changes
  const handlePageChange = (page: string) => {
    setActivePage(page);
    window.location.hash = page;
    localStorage.setItem('activePage', page);
  };

  useEffect(() => {
    // Listen for hash changes (back/forward buttons)
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      const validPages = ['about', 'resume', 'portfolio', 'blogs', 'contact'];
      if (hash && validPages.includes(hash)) {
        setActivePage(hash);
        localStorage.setItem('activePage', hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [activePage]);

  const getPageSEO = () => {
    const baseUrl = 'https://nishantmakwanaa.github.io/';
    
    switch (activePage) {
      case 'about':
        return {
          title: 'About | Nishant Makwana - Software Engineer',
          description: 'Learn about Nishant Makwana, a Software Engineer passionate about web development, competitive programming, and creating innovative tech solutions.',
          url: `${baseUrl}#about`,
        };
      case 'resume':
        return {
          title: 'Resume | Nishant Makwana - Software Engineer',
          description: 'View the professional resume and experience of Nishant Makwana, including education, work experience, skills, and certifications.',
          url: `${baseUrl}#resume`,
        };
      case 'portfolio':
        return {
          title: 'Portfolio | Nishant Makwana - Software Engineer',
          description: 'Explore the portfolio of projects by Nishant Makwana, showcasing web development projects, GitHub repositories, and innovative tech solutions.',
          url: `${baseUrl}#portfolio`,
        };
      case 'blogs':
        return {
          title: 'Blogs | Nishant Makwana - Software Engineer',
          description: 'Read blogs and articles by Nishant Makwana about software engineering, web development, hackathons, and tech insights.',
          url: `${baseUrl}#blogs`,
        };
      case 'contact':
        return {
          title: 'Contact | Nishant Makwana - Software Engineer',
          description: 'Get in touch with Nishant Makwana. Contact information and ways to connect for collaborations, opportunities, or inquiries.',
          url: `${baseUrl}#contact`,
        };
      default:
        return {
          title: 'Nishant Makwana - Software Engineer | Portfolio',
          description: 'Portfolio of Nishant Makwana, a Software Engineer specializing in web development, competitive programming, and innovative tech solutions.',
          url: baseUrl,
        };
    }
  };

  const pageSEO = getPageSEO();

  const renderPage = () => {
    switch (activePage) {
      case 'about':
        return (
          <About
            about={mockData.about}
            testimonials={mockData.testimonials}
            clients={mockData.clients}
          />
        );
      case 'resume':
        return <Resume resume={mockData.resume} resumeUrl={mockData.personalInfo.resumeUrl} />;
      case 'portfolio':
        return <Portfolio portfolio={mockData.portfolio} />;
      case 'blogs':
        return <Blog blog={mockData.blog} />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <About
            about={mockData.about}
            testimonials={mockData.testimonials}
            clients={mockData.clients}
          />
        );
    }
  };

  return (
    <main>
      <SEO
        title={pageSEO.title}
        description={pageSEO.description}
        url={pageSEO.url}
      />
      <Sidebar personalInfo={mockData.personalInfo} socialLinks={mockData.socialLinks} />
      <div className="main-content">
        <Navbar activePage={activePage} setActivePage={handlePageChange} />
        {renderPage()}
      </div>
    </main>
  );
}

export default App;
