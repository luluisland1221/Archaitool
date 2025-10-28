import React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { configuredCategories } from '../data/tools';
import { DynamicScreenshotImage } from '../components/DynamicScreenshotImage';
import { screenshotService } from '../services/screenshotService';

const Home = () => {
  const navigate = useNavigate();

  // List of newly added tool IDs
  const newToolIds = [
    'ai-architectures',
    'vibe3d',
    '3d-house-planner',
    'floordesign-ai',
    'home-design-ai',
    'rendera-ai',
    'renovate-ai',
    'artevia',
    'madespace',
    'rustic-ai',
    'ai-garden-design',
    'landscapingai',
    'arcadium3d'
  ];

  useEffect(() => {
    document.title = 'Arch AI Tool - Discover AI Tools for Architecture & Design';

    // Preload first screen images
    const preloadFirstScreenImages = async () => {
      try {
        // Get URLs of first 6 tools for preloading
        const firstScreenUrls = [];
        for (const category of configuredCategories) {
          for (const subcategory of category.subcategories) {
            for (const tool of subcategory.tools.slice(0, 2)) { // First 2 tools per category
              if (tool.useDynamicScreenshot && firstScreenUrls.length < 6) {
                firstScreenUrls.push(tool.url);
              }
            }
            if (firstScreenUrls.length >= 6) break;
          }
          if (firstScreenUrls.length >= 6) break;
        }

        if (firstScreenUrls.length > 0) {
          console.log('Preloading first screen screenshots:', firstScreenUrls);
          await screenshotService.preloadScreenshots(firstScreenUrls, true);
        }
      } catch (error) {
        console.warn('Failed to preload first screen images:', error);
      }
    };

    // Start preloading after 1 second delay to avoid blocking page rendering
    const timer = setTimeout(preloadFirstScreenImages, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (toolId: string) => {
    navigate(`/tool/${toolId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center py-12" 
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
              Discover AI Tools for Architecture
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Your gateway to agentic architecture and AI-powered design solutions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {configuredCategories.map((category) => (
                <Link
                  to={`/tools/${category.id}`}
                  key={category.id}
                  className="group bg-black/30 border-[1.5px] border-white/50 py-4 px-6 text-white hover:bg-black/50 hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 flex items-center justify-center min-h-[80px]"
                >
                  <h3 className="font-medium text-sm md:text-base leading-tight">
                    {category.id === 'interior-design' ? (
                      <>
                        Interior<br />Design
                      </>
                    ) : (
                      category.name
                    )}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools by Category */}
      {configuredCategories.map((category) => (
        <section key={category.id} className="py-16 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Primary Category Header */}
            <div className="bg-gray-200 p-8 mb-12 border-l-4 border-black">
              <h2 className="text-3xl font-bold text-black">{category.name}</h2>
              <p className="text-gray-700 mt-2">{category.description}</p>
            </div>
            
            {/* Subcategories */}
            <div className="space-y-16">
              {category.subcategories.map((subcategory) => (
                <div key={subcategory.id} className="mb-12">
                  <div className="border-b border-gray-200 pb-4 mb-8">
                    <h3 className="text-2xl font-semibold text-black">
                      {subcategory.name}
                    </h3>
                    <p className="text-gray-600 mt-2">{subcategory.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {subcategory.tools.slice(0, 3).map((tool) => {
                      const isNewTool = newToolIds.includes(tool.id);
                      return (
                        <div
                          key={tool.id}
                          onClick={() => navigate(`/tool/${tool.id}`)}
                          className="group bg-white shadow-lg hover:shadow-2xl transition-all duration-300 relative"
                        >
                          <div className="relative">
                            <div className="relative overflow-hidden">
                              <DynamicScreenshotImage
                                toolUrl={tool.url}
                                toolName={tool.name}
                                fallbackImage={tool.fallbackImage || tool.image}
                                alt={tool.name}
                                className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                                useDynamicScreenshot={tool.useDynamicScreenshot}
                                lazy={true}
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              {isNewTool && (
                                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase z-20">
                                  NEW
                                </div>
                              )}
                            </div>
                            <div className="p-6 relative z-10">
                              <h4 className="text-xl font-semibold mb-2">
                                {tool.name}
                              </h4>
                              <p className="text-gray-600 mb-4">
                                {tool.description}
                              </p>
                              <div className="flex justify-between items-center">
                                <span className={`px-3 py-1 ${tool.isPaid ? 'bg-gray-100' : 'bg-green-50'} text-sm rounded-full`}>
                                  {tool.isPaid ? 'Paid' : 'Free'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <a
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="h-4 w-4 text-gray-600" />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Link
                      to={`/tools/${category.id}/${subcategory.id}`}
                      className="inline-block px-6 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-colors transform hover:-translate-y-1 hover:shadow-xl duration-300"
                    >
                      View All {subcategory.name} Tools ({subcategory.tools.length})
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* About Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Transforming Architecture with AI</h2>
            <p className="text-lg text-gray-300 mb-8">
              Welcome to the future of architectural design. Our platform showcases the latest agentic AI architecture tools, 
              helping professionals humanize AI in their workflow. From Building design to medallion architecture, 
              we curate the most innovative AI agent architecture solutions to enhance your creative process.
            </p>
            <Link
              to="/tools"
              className="border-2 border-white text-white px-8 py-3 hover:bg-white hover:text-black transition-colors inline-block transform hover:-translate-y-1 hover:shadow-xl duration-300"
            >
              Explore All Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;