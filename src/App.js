import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import 'react-loading-skeleton/dist/skeleton.css'
import Footer from "./components/Footer";
import Work from "./pages/Work";
import NotionRedirect from "./pages/NotionRedirect";

export default function App() {
  return (
    <div className="app">
      <Header />
      <Routes></Routes>
      <Footer />
    </div>
    )
}