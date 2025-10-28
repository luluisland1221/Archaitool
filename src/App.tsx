import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tools from './pages/Tools';
import ToolDetail from './pages/ToolDetail';
import About from './pages/About';
import ResearchManagement from './pages/ResearchManagement';

// Component to handle title updates
const TitleUpdater = () => {
  const location = useLocation();
  
  useEffect(() => {
    const titles = {
      '/': 'Arch AI Tool - Discover AI Tools for Architecture & Design',
      '/tools': 'AI Architecture Tools - Browse All Categories | Arch AI Tool',
      '/about': 'About Us - Arch AI Tool',
      '/tools/architecture-spatial': 'Architecture & Spatial Design Tools | Arch AI Tool',
      '/tools/interior-design': 'Interior Design Tools | Arch AI Tool',
      '/tools/landscape-design': 'Landscape Design Tools | Arch AI Tool',
      '/tools/general-design': 'General Design Tools | Arch AI Tool',
      '/tools/real-estate': 'Real Estate Tools | Arch AI Tool',
      '/admin/research': 'Research Management | Arch AI Tool'
    };
    
    // Handle tool detail pages
    if (location.pathname.startsWith('/tools/')) {
      document.title = 'Tool Details | Arch AI Tool';
    } else {
      document.title = titles[location.pathname] || 'Arch AI Tool';
    }
  }, [location]);
  
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <TitleUpdater />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/:category" element={<Tools />} />
            <Route path="/tools/:category/:subcategory" element={<Tools />} />
            <Route path="/tools/:id" element={<ToolDetail />} />
            <Route path="/tool/:id" element={<ToolDetail />} />
            <Route path="/about" element={<About />} />
            {/* Admin routes for research management */}
            <Route path="/admin/research" element={<ResearchManagement />} />
            {/* Redirect old query parameter URLs to new path-based URLs */}
            <Route path="/tools" element={<Navigate to="/tools" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;