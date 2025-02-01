import { ThemeProvider, createGlobalStyle } from "styled-components";
import { useState } from "react";
import { darkTheme, lightTheme } from "./utils/Themes";
import Navbar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import ProjectDetails from "./components/Projects/ProjectDetails";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
  }

  body {
    margin: 0 !important;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: ${({ theme }) => theme.bg};
  }

  html {
    scroll-behavior: smooth;
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 80px;
  }
  
  ::-webkit-scrollbar-track {
    background:#222A35;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #575C66;
    border-radius: 6px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #626970;
  }
`;

const Body = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%),
              linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });

 return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        <Navbar setDarkMode={setDarkMode} />
        <Body>
          <Home />
          <Wrapper>
            <Skills />
            <Experience />
          </Wrapper>
          <Projects openModal={openModal} setOpenModal={setOpenModal} />
          <Wrapper>
            <Education />
            <Contact />
          </Wrapper>
          <Footer />
          {openModal.state && <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />}
          <Routes>
          </Routes>
        </Body>
      </Router>
    </ThemeProvider>
  );
}

export default App;