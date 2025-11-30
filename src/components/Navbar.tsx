import React from 'react';

interface NavbarProps {
    activePage: string;
    setActivePage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
    const navItems = ['About', 'Resume', 'Portfolio', 'Blogs', 'Contact'];

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                {navItems.map((item) => (
                    <li className="navbar-item" key={item}>
                        <button
                            className={`navbar-link ${activePage === item.toLowerCase() ? 'active' : ''}`}
                            data-nav-link
                            onClick={() => setActivePage(item.toLowerCase())}
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
