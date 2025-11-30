import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import About from './pages/About';
import Resume from './pages/Resume';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import mockData from './assets/mock-data.json';

function App() {
  const [activePage, setActivePage] = useState('about');

  useEffect(() => {
    window.scrollTo(0, 0);
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
        return <Resume resume={mockData.resume} />;
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
        <Navbar activePage={activePage} setActivePage={setActivePage} />
        {renderPage()}
      </div>
    </main>
  );
}

export default App;
