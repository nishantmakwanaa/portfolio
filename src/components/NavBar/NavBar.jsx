import React from 'react';
import { DiCssdeck } from 'react-icons/di';
import { FaBars } from 'react-icons/fa';
import { Bio } from '../../data/Data';
import { useTheme } from 'styled-components';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  Span,
  NavItems,
  NavLink,
  GitHubButton,
  ButtonContainer,
  MobileIcon,
  MobileMenu,
  MobileLink,
} from './NavBar-Styles';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme();

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to='/'>
          <div style={{ display: "flex", alignItems: "center", color: "white", cursor: 'pointer' }}>
            <DiCssdeck size="3rem" /> <Span>Nishant&apos;S Portfolio</Span>
          </div>
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
        <NavLink href='#contact' smooth style={{ fontWeight: 'bold' }}>Contact</NavLink>
        </NavItems>
        <ButtonContainer>
          <GitHubButton href={Bio.github} style={{ fontWeight: 'bold' }} target="_blank">
            GitHub Profile
          </GitHubButton>
        </ButtonContainer>
        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <MobileLink href="#" smooth style={{ fontWeight: 'bold' }} onClick={() => setIsOpen(!isOpen)}>Home</MobileLink>
            <MobileLink href='#skills' smooth style={{ fontWeight: 'bold' }} onClick={() => setIsOpen(!isOpen)}>Skills</MobileLink>
            <MobileLink href='#experience' smooth style={{ fontWeight: 'bold' }} onClick={() => setIsOpen(!isOpen)}>Experience</MobileLink>
            <MobileLink href='#projects' smooth style={{ fontWeight: 'bold' }} onClick={() => setIsOpen(!isOpen)}>Projects</MobileLink>
            <MobileLink href='#education' smooth style={{ fontWeight: 'bold' }} onClick={() => setIsOpen(!isOpen)}>Education</MobileLink>
            <MobileLink href='#achievements' smooth style={{ fontWeight: 'bold' }} onClick={() => setIsOpen(!isOpen)}>Achievements</MobileLink>
            <MobileLink href='#contact' smooth style={{ fontWeight: 'bold' }} onClick={() => setIsOpen(!isOpen)}>Contact</MobileLink>
            <GitHubButton
              style={{
                padding: '10px 16px',
                background: `${theme.primary}`,
                color: 'white',
                width: 'max-content',
                fontWeight: 'bold',
              }}
              href={Bio.github}
              target="_blank"
            >
              Github Profile
            </GitHubButton>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;