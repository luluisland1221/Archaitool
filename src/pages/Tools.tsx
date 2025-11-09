import React from 'react';
import { useEffect } from 'react';
import { useSearchParams, useParams, Link, useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { configuredCategories } from '../data/tools';
import { DynamicScreenshotImage } from '../components/DynamicScreenshotImage';
import { generateToolUrl } from '../utils/urlHelper';

const Tools = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = useParams();

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
  
  // Support both old query params and new path params
  const categoryId = searchParams.get('category');
  const subcategoryId = searchParams.get('subcategory');
  
  // Use path params if available, otherwise fall back to query params
  const finalCategoryId = params.category || categoryId;
  const finalSubcategoryId = params.subcategory || subcategoryId;
  
  const selectedCategory = finalCategoryId 
    ? configuredCategories.find(cat => cat.id === finalCategoryId)
    : null;

  const selectedSubcategory = selectedCategory && finalSubcategoryId
    ? selectedCategory.subcategories.find(sub => sub.id === finalSubcategoryId)
    : null;

  useEffect(() => {
    let title = 'AI Architecture Tools - Browse All Categories | Arch AI Tool';
    
    if (selectedSubcategory) {
      title = `${selectedSubcategory.name} - AI Tools | Arch AI Tool`;
    } else if (selectedCategory) {
      title = `${selectedCategory.name} - AI Tools | Arch AI Tool`;
    }
    
    document.title = title;
  }, [selectedCategory, selectedSubcategory]);

  const renderBreadcrumbs = () => (
    <div className="flex items-center gap-2 mb-8 text-sm">
      <Link to="/tools" className="text-gray-600 hover:text-black">
        All Categories
      </Link>
      {selectedCategory && (
        <>
          <span className="text-gray-400">/</span>
          <Link 
            to={`/tools/${selectedCategory.id}`}
            className="text-gray-600 hover:text-black"
          >
            {selectedCategory.name}
          </Link>
        </>
      )}
      {selectedSubcategory && (
        <>
          <span className="text-gray-400">/</span>
          <span className="text-black">{selectedSubcategory.name}</span>
        </>
      )}
    </div>
  );

  const renderCategories = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {configuredCategories.map((category) => (
        <div
          key={category.id}
          onClick={() => navigate(`/tools/${category.id}`)}
          className="bg-gray-200 p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-gray-100 cursor-pointer"
        >
          <h2 className="text-2xl font-bold mb-3">{category.name}</h2>
          <p className="text-gray-600 mb-4">{category.description}</p>
          <div className="space-y-2 bg-white p-4 rounded-lg">
            {category.subcategories.map((sub) => (
              <div key={sub.id} className="text-sm text-gray-500">
                • {sub.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const ToolCard = ({ tool }) => {
    const handleCardClick = (e) => {
      e.preventDefault();
      navigate(generateToolUrl(tool.id));
    };

    const isNewTool = newToolIds.includes(tool.id);

    return (
      <div
        onClick={handleCardClick}
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
              <div className="absolute top-4 left-4 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase z-20">
                NEW
              </div>
            )}
          </div>
          <div className="p-6 relative z-10">
            <h3 className="text-xl font-semibold mb-2">
              {tool.name}
            </h3>
            <p className="text-gray-600 mb-4">
              {tool.description}
            </p>
            <div className="flex justify-between items-center">
              <span className={`px-3 py-1 ${tool.isPaid ? 'bg-gray-100' : 'bg-gray-50'} text-sm rounded-full`}>
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
  };

  const renderSubconfiguredCategories = (category) => (
    <div className="space-y-16">
      {category.subcategories.map((subcategory) => (
        <div key={subcategory.id}>
          <div className="border-b border-gray-200 pb-4 mb-8">
            <h2 className="text-2xl font-bold mb-3">{subcategory.name}</h2>
            <p className="text-gray-600">{subcategory.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subcategory.tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderTools = (subcategory) => (
    <div>
      <h1 className="text-3xl font-bold mb-4">{subcategory.name} - AI Tools Directory</h1>
      <p className="text-gray-600 mb-8">{subcategory.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subcategory.tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderBreadcrumbs()}
        
        {!selectedCategory && (
          <>
            <h1 className="text-4xl font-bold mb-8">Complete Architecture AI Tools Directory - Free & Professional Solutions</h1>
            {renderCategories()}
          </>
        )}

        {selectedCategory && !selectedSubcategory && (
          <>
            <h1 className="text-4xl font-bold mb-8">{selectedCategory.name} - AI Tools & Software</h1>
            {renderSubconfiguredCategories(selectedCategory)}
          </>
        )}

        {selectedCategory && selectedSubcategory && (
          renderTools(selectedSubcategory)
        )}
      </div>
    </div>
  );
};

export default Tools;