import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useLocation, NavigateFunction } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tools from './pages/Tools';
import ToolDetail from './pages/ToolDetail';
import About from './pages/About';
import ResearchManagement from './pages/ResearchManagement';
import { StructuredData, generateHomepageStructuredData } from './components/StructuredData';
// Removed redirect imports - not needed for static site


// Component to handle title updates and canonical URLs
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
      '/admin/research': 'Research Management | Arch AI Tool',
      // New category-based tool URLs
      '/architectural-design': 'Architectural Design AI Tools | Arch AI Tool',
      '/interior-design': 'Interior Design AI Tools | Arch AI Tool',
      '/landscape-design': 'Landscape Design AI Tools | Arch AI Tool',
      '/design-tools': 'Design Tools AI | Arch AI Tool',
      '/real-estate': 'Real Estate AI Tools | Arch AI Tool'
    };

    // Check if this is a category-based tool URL
    const isCategoryToolUrl = /^\/(architectural-design|architectural-visualization|design-automation|interior-design-remodeling|landscape-planning|multi-domain-ai|property-visualization|virtual-staging)\/[^\/]+$/.test(location.pathname);

    // NOTE: redirects removed - all pages are now static HTML
    // No need for JavaScript-based URL redirections

    // Update page title
    if (isCategoryToolUrl || location.pathname.startsWith('/tool/')) {
      document.title = 'AI Tool Details | Arch AI Tool';
    } else {
      document.title = titles[location.pathname] || 'Arch AI Tool';
    }

    // Set canonical URL to avoid redirect chains
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    // Always point to the non-www HTTPS version to avoid redirect chains
    canonicalLink.href = `https://archaitool.com${location.pathname}${location.search}`;

    // Set meta description for non-tool pages
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }

    const descriptions = {
      '/': 'Discover the best AI tools for architecture and design. Explore comprehensive directory of AI-powered architectural generation, visualization, interior design tools and more.',
      '/tools': 'Browse all AI architecture and design tools by category. Find the perfect AI tool for architectural design, visualization, interior design, and real estate.',
      '/about': 'Learn about Arch AI Tool - your comprehensive guide to AI-powered architecture and design tools. Discover how we help professionals find the best AI solutions.',
      '/tools/architecture-spatial': 'Explore AI tools for architectural design and spatial planning. Discover cutting-edge AI solutions for building design, floor planning, and architectural visualization.',
      '/tools/interior-design': 'Find AI tools for interior design and remodeling. Transform spaces with AI-powered room design, furniture placement, and virtual staging solutions.',
      '/tools/landscape-design': 'Discover AI tools for landscape design and garden planning. Create stunning outdoor spaces with AI-powered landscape architecture and design solutions.',
      '/tools/general-design': 'Explore multi-domain AI design tools. Find versatile AI solutions for various design disciplines including architectural visualization and creative design.',
      '/tools/real-estate': 'Find AI tools for real estate visualization and property marketing. Enhance property listings with AI-powered virtual staging, 3D tours, and design visualization.',
    };

    if (location.pathname.startsWith('/tool/')) {
      metaDescription.content = 'Discover detailed information about AI architecture and design tools. Read reviews, compare features, and find the perfect AI solution for your project.';
    } else {
      metaDescription.content = descriptions[location.pathname] || descriptions['/'];
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Add structured data for homepage */}
        <StructuredData data={generateHomepageStructuredData()} />
        <TitleUpdater />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/:category" element={<Tools />} />
            <Route path="/tools/:category/:subcategory" element={<Tools />} />
            {/* Main tool detail route - using /tool/:id format */}
            <Route path="/tool/:id" element={<ToolDetail />} />
            {/* Legacy support for /tools/:id */}
            <Route path="/tools/:id" element={<ToolDetail />} />
            {/* Legacy category-based tool URLs - redirect to main route */}
            <Route path="/architectural-design/:id" element={<ToolDetail />} />
            <Route path="/interior-design/:id" element={<ToolDetail />} />
            <Route path="/landscape-design/:id" element={<ToolDetail />} />
            <Route path="/design-tools/:id" element={<ToolDetail />} />
            <Route path="/real-estate/:id" element={<ToolDetail />} />
            <Route path="/about" element={<About />} />
            {/* Admin routes for research management */}
            <Route path="/admin/research" element={<ResearchManagement />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;