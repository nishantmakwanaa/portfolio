import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Bio } from '../../data/Data';
import { useTheme } from 'styled-components';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavItems,
  NavLink,
  ButtonContainer,
  MobileIcon,
  MobileMenu,
  MobileLink,
} from './NavBar-Styles';
import { GitHub } from '@mui/icons-material';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme();

  const handleLogoClick = () => {
    window.open(Bio.github, '_blank');
  };

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo>
          <button
            onClick={handleLogoClick}
            style={{ display: "flex", alignItems: "center", background: "none", border: "none", color: "white", cursor: "pointer" }}
          >
            <GitHub style={{ fontSize: '3rem', marginRight: '8px' }} />
            <NavLink style={{ fontSize: '1rem', fontWeight: 'bold', color: 'inherit', textDecoration: 'none' }}>GitHub Profile</NavLink>
          </button>
        </NavLogo>
        <MobileIcon>
          <FaBars onClick={() => setIsOpen(!isOpen)} />
        </MobileIcon>
        <NavItems>
          <NavLink href="#" smooth style={{ fontWeight: 'bold' }}>Home</NavLink>
          <NavLink href='#skills' smooth style={{ fontWeight: 'bold' }}>Skills</NavLink>
          <NavLink href='#experience' smooth style={{ fontWeight: 'bold' }}>Experience</NavLink>
          <NavLink href='#projects' smooth style={{ fontWeight: 'bold' }}>Projects</NavLink>
          <NavLink href='#education' smooth style={{ fontWeight: 'bold' }}>Education</NavLink>
          <NavLink href='#achievements' smooth style={{ fontWeight: 'bold' }}>Achievements</NavLink>
        </NavItems>
        <ButtonContainer>
          <NavLink 
            href='#contact' 
            smooth 
            style={{ 
              padding: '10px 16px', 
              background: `${theme.primary}`, 
              color: 'white', 
              fontWeight: 'bold',
              borderRadius: '6px'
            }}
          >
            Contact Me
          </NavLink>
        </ButtonContainer>
        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <MobileLink href="#" smooth style={{ fontWeight: 'bold' }} onClick={() => setIsOpen(!isOpen)}>Home</MobileLink>
            <MobileLink href='#skills' smooth style={{ fontWeight: 'bold' }} onClick={() => setIsOpen(!isOpen)}>Skills</MobileLink>
            <MobileLink href='#experience' smooth style={{ fontWeight: 'bold' }} onClick={() => setIsOpen(!isOpen)}>Experience</MobileLink>
            <MobileLink href='#projects' smooth style={{ fontWeight: 'bold' }} onClick={() => setIsOpen(!isOpen)}>Projects</MobileLink>
            <MobileLink href='#education' smooth style={{ fontWeight: 'bold' }} onClick={() => setIsOpen(!isOpen)}>Education</MobileLink>
            <MobileLink href='#achievements' smooth style={{ fontWeight: 'bold' }} onClick={() => setIsOpen(!isOpen)}>Achievements</MobileLink>
            <NavLink
              href='#contact' 
              smooth 
              style={{ 
                padding: '10px 16px', 
                background: `${theme.primary}`, 
                color: 'white', 
                width: 'max-content', 
                fontWeight: 'bold',
                borderRadius: '6px'
              }}
            >
              Contact Me
            </NavLink>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;