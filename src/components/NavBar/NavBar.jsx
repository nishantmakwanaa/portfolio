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
        <NavLink href="#about" smooth style={{ fontWeight: 'bold' }}>About</NavLink>
        <NavLink href='#skills' smooth style={{ fontWeight: 'bold' }}>Skills</NavLink>
        <NavLink href='#experience' smooth style={{ fontWeight: 'bold' }}>Experience</NavLink>
        <NavLink href='#projects' smooth style={{ fontWeight: 'bold' }}>Projects</NavLink>
        <NavLink href='#education' smooth style={{ fontWeight: 'bold' }}>Education</NavLink>
        </NavItems>
        <ButtonContainer>
          <GitHubButton href={Bio.github} style={{ fontWeight: 'bold' }} target="_blank">
            GitHub Profile
          </GitHubButton>
        </ButtonContainer>
        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <MobileLink href="#about" smooth style={{ fontWeight: 'bold' }} onClick={() => setIsOpen(!isOpen)}>About</MobileLink>
            <MobileLink href='#skills' smooth style={{ fontWeight: 'bold' }} onClick={() => setIsOpen(!isOpen)}>Skills</MobileLink>
            <MobileLink href='#experience' smooth style={{ fontWeight: 'bold' }} onClick={() => setIsOpen(!isOpen)}>Experience</MobileLink>
            <MobileLink href='#projects' smooth style={{ fontWeight: 'bold' }} onClick={() => setIsOpen(!isOpen)}>Projects</MobileLink>
            <MobileLink href='#education' smooth style={{ fontWeight: 'bold' }} onClick={() => setIsOpen(!isOpen)}>Education</MobileLink>
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