import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
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
      <Sidebar personalInfo={mockData.personalInfo} socialLinks={mockData.socialLinks} />
      <div className="main-content">
        <Navbar activePage={activePage} setActivePage={handlePageChange} />
        {renderPage()}
      </div>
    </main>
  );
}

export default App;
