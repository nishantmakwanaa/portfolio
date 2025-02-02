import styled from 'styled-components';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LeetCodeIcon from '@mui/icons-material/Code';
import LinkIcon from '@mui/icons-material/Link';
import SnapchatIcon from '@mui/icons-material/EmojiEmotions';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Bio } from '../../data/Data';

const FooterContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  //background: linear-gradient(100.26deg, rgba(0, 102, 255, 0.05) 42.33%, rgba(150, 0, 225, 0.05) 127.07%);
`;


const FooterWrapper = styled.footer`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  padding: 1rem;
  color: ${({ theme }) => theme.text_primary};
`;

const Logo = styled.h1`
  font-weight: 600;
  font-size: 20px;
  background: linear-gradient(225deg, hsla(271, 100%, 60%, 1) 0%, hsla(294, 100%, 60%, 1) 100%);
  -webkit-background-clip: text;
  color: transparent; /* Makes the text transparent so the gradient is visible */
`;

const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const SocialMediaIcon = styled.a`
  display: inline-block;
  margin: 0 1rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text_primary};
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Copyright = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.soft2};
  text-align: center;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <Logo>Eat, Sleep, Code, Repeat !</Logo>
        <SocialMediaIcons>
          <SocialMediaIcon href={Bio.github} target="display"><GitHubIcon /></SocialMediaIcon>
          <SocialMediaIcon href={Bio.instagram} target="display"><InstagramIcon /></SocialMediaIcon>
          <SocialMediaIcon href={Bio.leetcode} target="display"><LeetCodeIcon /></SocialMediaIcon>
          <SocialMediaIcon href={Bio.linkedin} target="display"><LinkedInIcon /></SocialMediaIcon>
          <SocialMediaIcon href={Bio.linktree} target="display"><LinkIcon /></SocialMediaIcon>
          <SocialMediaIcon href={Bio.snapchat} target="display"><SnapchatIcon /></SocialMediaIcon>
          <SocialMediaIcon href={Bio.twitter} target="display"><TwitterIcon /></SocialMediaIcon>
          <SocialMediaIcon href={Bio.youtube} target="display"><YouTubeIcon /></SocialMediaIcon>
        </SocialMediaIcons>
        <Copyright>
          &copy; 2025 Nishant Makwana. All Rights Reserved.
        </Copyright>

      </FooterWrapper>
    </FooterContainer>
  );
}

export default Footer;