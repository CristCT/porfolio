import "./App.css";
import NavBar from "./PortfolioContainer/NavBar/NavBar";
import Home from "./PortfolioContainer/Home/Home";
import Skills from "./PortfolioContainer/Skills/Skills";
import Projects from "./PortfolioContainer/Projects/Projects";
import ContactMe from "./PortfolioContainer/ContactMe/ContactMe";
import Footer from "./PortfolioContainer/Footer/Footer";
import GoTop from "./PortfolioContainer/GoTop/GoTop";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./Themes";

function App() {
  const [theme, setTheme] = useState("dark");
    return ( 
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <div className = "App">
            <GoTop />
            <NavBar theme={theme} setTheme={setTheme} />
            <Home theme={theme} setTheme={setTheme} />
            <Skills />
            <Projects />
            <ContactMe />
            <Footer />
        </div>
      </ThemeProvider>
    );
}

export default App;