import { Route, Routes } from "react-router-dom";
import 'react-loading-skeleton/dist/skeleton.css'
import Header from "./components/Header";
import { useRef } from "react";
import Home from "./pages/Home";

export default function App() {
  const viewRouting = useRef([
    { path: "/", renderView: <Home /> }
  ]);

  return (
    <div className="app">
      <Header />
      <Routes>
        {viewRouting.current?.map((viewRoute, viewRouteIndex) => (
          <Route path={viewRoute?.path} 
            element={viewRoute?.renderView} 
            key={viewRouteIndex} 
          />
        ))}
      </Routes>
    </div>
    )
}