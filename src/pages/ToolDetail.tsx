import React from 'react';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, ArrowLeft, Check, Building2, Cpu, Palette, Clock } from 'lucide-react';
import { configuredCategories } from '../data/tools';
import { DynamicScreenshotImage } from '../components/DynamicScreenshotImage';

const ToolDetail = () => {
  const { id } = useParams();

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

  // Find the tool in our data
  const tool = configuredCategories.flatMap(category =>
    category.subcategories.flatMap(subcategory =>
      subcategory.tools
    )
  ).find(t => t.id === id);

  // Check if this is a new tool
  const isNewTool = newToolIds.includes(id);

  useEffect(() => {
    if (tool) {
      document.title = `${tool.name} - AI Architecture Tool | Arch AI Tool`;
    } else {
      document.title = 'Tool Not Found | Arch AI Tool';
    }
  }, [tool]);

  if (!tool) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-4">Tool not found</h1>
            <p className="text-gray-600 mb-6">The tool you're looking for doesn't exist.</p>
            <Link 
              to="/tools" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Find the category and subcategory
  const category = configuredCategories.find(c => 
    c.subcategories.some(s => s.tools.some(t => t.id === id))
  );
  
  const subcategory = category?.subcategories.find(s => 
    s.tools.some(t => t.id === id)
  );

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Link 
            to="/tools" 
            className="inline-flex items-center text-gray-600 hover:text-black"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tools
          </Link>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Hero Section */}
          <div className="relative h-64 md:h-96 max-h-96 overflow-hidden">
            <DynamicScreenshotImage
              toolUrl={tool.url}
              toolName={tool.name}
              fallbackImage={tool.fallbackImage || tool.image}
              alt={tool.name}
              className="w-full h-full object-cover"
              useDynamicScreenshot={tool.useDynamicScreenshot}
              lazy={false}
              style={{ maxHeight: '384px' }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-bold">{tool.name}</h1>
                  {isNewTool && (
                    <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full uppercase">
                      NEW
                    </span>
                  )}
                </div>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-100 transition-colors inline-flex items-center"
                >
                  Visit Website
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold mb-4">About {tool.name}</h2>
                  <p className="text-gray-600 mb-6">{tool.description}</p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <Building2 className="h-6 w-6 text-blue-500 mr-2" />
                        <h3 className="text-lg font-semibold">Architecture</h3>
                      </div>
                      <p className="text-gray-600">
                        Advanced architectural design and visualization capabilities
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <Cpu className="h-6 w-6 text-purple-500 mr-2" />
                        <h3 className="text-lg font-semibold">AI-Powered</h3>
                      </div>
                      <p className="text-gray-600">
                        Utilizes advanced AI algorithms for optimal results
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <Palette className="h-6 w-6 text-green-500 mr-2" />
                        <h3 className="text-lg font-semibold">Design</h3>
                      </div>
                      <p className="text-gray-600">
                        Intuitive design tools and customization options
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <Clock className="h-6 w-6 text-orange-500 mr-2" />
                        <h3 className="text-lg font-semibold">Time-Saving</h3>
                      </div>
                      <p className="text-gray-600">
                        Streamlined workflow for faster project completion
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      Advanced AI-powered visualization and generation
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      Intuitive user interface for seamless workflow
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      Fast rendering capabilities with high-quality output
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      Professional-grade results for architectural projects
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      Extensive customization options and style controls
                    </li>
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="bg-gray-50 p-6 rounded-lg h-fit">
                <h3 className="text-lg font-semibold mb-4">Tool Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{category?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Subcategory</p>
                    <p className="font-medium">{subcategory?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pricing</p>
                    <p className="font-medium">{tool.isPaid ? 'Paid' : 'Free'}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-black text-white text-center py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Try {tool.name}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;