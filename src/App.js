import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useState } from 'react';
import Header from './components/Header';

export default function App() {
  const [currentThemeRef, setCurrentTheme] = useState('light');
  return (
    <div className={'app ' + `${() => {
      if (currentThemeRef === 'dark') {
        return 'bg-color-black';
      }
    }}`}>
      <BrowserRouter>
        <Header pageTheme={currentThemeRef} pageThemeMethod={setCurrentTheme} />
        <Routes>
          <Route path="" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}