import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useState } from 'react';
import Header from './components/Header';
import { saveCurrentTheme } from "./utils/LocalStorageHelpers";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from './pages/Services';

export default function App() {
  const [currentThemeRef, setCurrentTheme] = useState(getCurrentThemeRef());
  saveCurrentTheme(currentThemeRef);
  if (currentThemeRef === 'dark') {
    return (
      <div className="app" style={{ backgroundColor: '#202020', color: 'white' }}>
        <BrowserRouter>
          <Header pageTheme={currentThemeRef} pageThemeMethod={setCurrentTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  } else {
    return (
      <div className="app">
        <BrowserRouter>
          <Header pageTheme={currentThemeRef} pageThemeMethod={setCurrentTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

function getCurrentThemeRef() {
  if (localStorage.getItem('theme') === null) {
    return 'light'
  } else {
    return localStorage.getItem('theme');
  }
}