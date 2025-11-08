import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ExternalLink, ArrowLeft, Check, Building2, Cpu, Palette, Clock,
  Star, Users, Globe, Zap, Award, FileText, Download, Play,
  ChevronDown, ChevronUp, Mail, MessageCircle, BookOpen
} from 'lucide-react';
import { configuredCategories, Tool } from '../data/tools';
import { DynamicScreenshotImage } from '../components/DynamicScreenshotImage';
import { generateToolUrl } from '../utils/urlHelper';

// 简化工具卡片样式
const toolVisitCard = "bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 transform hover:-translate-y-1";

const toolVisitCardContent = "p-6 bg-white hover:bg-gray-50 transition-colors duration-300";

const toolVisitCardButton = "w-full bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all transform hover:scale-105 font-semibold inline-flex items-center justify-center shadow-lg hover:shadow-xl text-lg border-2 border-white";

const ToolDetail = () => {
  const { id } = useParams();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

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
  ).find(t => t.id === id) as Tool | undefined;

  // Check if this is a new tool
  const isNewTool = newToolIds.includes(id);

  useEffect(() => {
    if (tool) {
      // Update page title
      document.title = `${tool.name} - ${tool.description} | Arch AI Tool`;

      // Update or create meta description
      let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }

      // Generate unique meta description based on tool information
      const description = tool.detailedDescription || tool.description;
      const features = tool.keyFeatures?.slice(0, 3).join(', ') || '';
      const pricingInfo = tool.isPaid ? 'Paid tool' : 'Free tool available';
      const metaDescText = `${tool.name}: ${description}. Key features: ${features}. ${pricingInfo}. Read reviews and explore this AI architecture tool.`;
      metaDescription.content = metaDescText.substring(0, 160);

      // Update or create canonical URL
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = `https://archaitool.com${generateToolUrl(tool.id)}`;

      // Update Open Graph meta tags
      let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.property = 'og:title';
        document.head.appendChild(ogTitle);
      }
      ogTitle.content = `${tool.name} - ${tool.description}`;

      let ogDescription = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
      if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.property = 'og:description';
        document.head.appendChild(ogDescription);
      }
      ogDescription.content = metaDescText.substring(0, 160);

      let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.property = 'og:url';
        document.head.appendChild(ogUrl);
      }
      ogUrl.content = `https://archaitool.com${generateToolUrl(tool.id)}`;

      // Update Twitter Card meta tags
      let twitterTitle = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement;
      if (!twitterTitle) {
        twitterTitle = document.createElement('meta');
        twitterTitle.name = 'twitter:title';
        document.head.appendChild(twitterTitle);
      }
      twitterTitle.content = `${tool.name} - ${tool.description}`;

      let twitterDescription = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement;
      if (!twitterDescription) {
        twitterDescription = document.createElement('meta');
        twitterDescription.name = 'twitter:description';
        document.head.appendChild(twitterDescription);
      }
      twitterDescription.content = metaDescText.substring(0, 160);

      // Add JSON-LD structured data for SEO
      const existingJsonLd = document.querySelector('script[type="application/ld+json"]');
      if (existingJsonLd) {
        existingJsonLd.remove();
      }

      const structuredData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.name,
        "description": tool.detailedDescription || tool.description,
        "url": tool.url,
        "applicationCategory": "DesignApplication",
        "operatingSystem": "Web Browser",
        "offers": tool.isPaid ? {
          "@type": "Offer",
          "price": "Paid",
          "priceCurrency": "USD"
        } : {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "creator": {
          "@type": "Organization",
          "name": "Arch AI Tool Directory"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Arch AI Tool Directory"
        },
        "dateModified": tool.lastUpdated || new Date().toISOString().split('T')[0],
        "aggregateRating": tool.userRating ? {
          "@type": "AggregateRating",
          "ratingValue": tool.userRating,
          "ratingCount": "100+"
        } : undefined
      };

      const jsonLdScript = document.createElement('script');
      jsonLdScript.type = 'application/ld+json';
      jsonLdScript.textContent = JSON.stringify(structuredData, null, 2);
      document.head.appendChild(jsonLdScript);

    } else {
      document.title = 'Tool Not Found | Arch AI Tool';

      // Set default meta description for 404 page
      let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (metaDescription) {
        metaDescription.content = 'The AI architecture tool you are looking for was not found. Explore our comprehensive directory of AI-powered architecture and design tools.';
      }
    }

    // Handle anchor scroll after component mounts
    setTimeout(() => {
      const hash = window.location.hash;
      if (hash === '#tool-content') {
        const element = document.getElementById('tool-content');
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    }, 100);
  }, [tool]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Text and Image side by side */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Left: Tool Information - spans 2 columns */}
            <div className="md:col-span-2 xl:max-w-[750px]">
              {/* Title and rating section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{tool.name} - AI Tool for Architecture & Design</h1>
                  {isNewTool && (
                    <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full uppercase">
                      NEW
                    </span>
                  )}
                  {tool.userRating && (
                    <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900">{tool.userRating}</span>
                      {tool.reviewCount && (
                        <span className="text-sm text-gray-600">({tool.reviewCount} reviews)</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-700 leading-relaxed">
                {tool.detailedDescription || tool.description}
              </p>
            </div>

            {/* Right: Tool Card - spans 1 column */}
            <div className={toolVisitCard}>
              {/* Screenshot */}
              <DynamicScreenshotImage
                toolUrl={tool.url}
                toolName={tool.name}
                fallbackImage={tool.fallbackImage || tool.image}
                alt={tool.name}
                className="w-full h-full object-cover transition-opacity duration-300 opacity-100"
                useDynamicScreenshot={false}
                lazy={false}
              />

              {/* CTA Button */}
              <div className={toolVisitCardContent}>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={toolVisitCardButton}
                >
                  Visit Website
                  <ExternalLink className="h-5 w-5 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="tool-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <nav className="flex flex-wrap items-center space-x-2 text-sm text-gray-600 mb-4">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link to="/tools" className="hover:text-black transition-colors">Tools</Link>
            {category && (
              <>
                <span>/</span>
                <Link to={`/tools/${category.id}`} className="hover:text-black transition-colors">
                  {category.name}
                </Link>
              </>
            )}
            {subcategory && (
              <>
                <span>/</span>
                <Link to={`/tools/${category.id}/${subcategory.id}`} className="hover:text-black transition-colors">
                  {subcategory.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-black font-medium">{tool.name}</span>
          </nav>

          <Link
            to="/tools"
            className="inline-flex items-center text-gray-600 hover:text-black"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tools
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Key Features Section */}
            {tool.keyFeatures && tool.keyFeatures.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tool.keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overview Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Overview</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {tool.detailedDescription || tool.description}
              </p>
            </div>

            {/* Technical Specifications */}
            {tool.technicalSpecs && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Technical Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tool.technicalSpecs.supportedFormats && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Supported Formats</h3>
                      <div className="flex flex-wrap gap-2">
                        {tool.technicalSpecs.supportedFormats.map((format, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {format}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {tool.technicalSpecs.exportOptions && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Export Options</h3>
                      <div className="flex flex-wrap gap-2">
                        {tool.technicalSpecs.exportOptions.map((option, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {option}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {tool.technicalSpecs.systemRequirements && (
                    <div className="md:col-span-2">
                      <h3 className="font-semibold text-gray-900 mb-2">System Requirements</h3>
                      <ul className="space-y-1">
                        {tool.technicalSpecs.systemRequirements.map((req, index) => (
                          <li key={index} className="text-gray-700">• {req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {tool.technicalSpecs.collaboration !== undefined && (
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-500" />
                        <span className="text-gray-700">Collaboration: {tool.technicalSpecs.collaboration ? 'Yes' : 'No'}</span>
                      </div>
                    )}
                    {tool.technicalSpecs.apiAvailable !== undefined && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-green-500" />
                        <span className="text-gray-700">API Available: {tool.technicalSpecs.apiAvailable ? 'Yes' : 'No'}</span>
                      </div>
                    )}
                    {tool.technicalSpecs.mobileSupport !== undefined && (
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-purple-500" />
                        <span className="text-gray-700">Mobile Support: {tool.technicalSpecs.mobileSupport ? 'Yes' : 'No'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Use Cases */}
            {tool.useCases && tool.useCases.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Use Cases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tool.useCases.map((useCase, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <Award className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700">{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing Information */}
            {tool.pricing && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Pricing</h2>

                {tool.pricing.freeTier && (
                  <div className="mb-8 p-6 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">Free Plan</h3>
                    <ul className="space-y-2">
                      {tool.pricing.freeTier.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-green-700">
                          <Check className="h-4 w-4" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {tool.pricing.freeTier.limitations && (
                      <div className="mt-4 text-sm text-green-600">
                        <strong>Limitations:</strong>
                        <ul className="mt-1 space-y-1">
                          {tool.pricing.freeTier.limitations.map((limitation, index) => (
                            <li key={index}>• {limitation}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {tool.pricing.paid?.plans && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Paid Plans</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {tool.pricing.paid.plans.map((plan, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-lg font-semibold">{plan.name}</h4>
                            <span className="text-2xl font-bold text-blue-600">{plan.price}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">{plan.targetUser}</p>
                          <ul className="space-y-2 mb-4">
                            {plan.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-gray-700">
                                <Check className="h-4 w-4 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
                            Billing: {plan.billing}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
                  {tool.pricing.trialAvailable && (
                    <span className="flex items-center gap-1">
                      <Play className="h-4 w-4" />
                      Free trial available
                    </span>
                  )}
                  {tool.pricing.enterprisePlan && (
                    <span className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      Enterprise plan available
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Integrations */}
            {tool.integrations && tool.integrations.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Integrations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tool.integrations.map((integration, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200">
                      <Globe className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700">{integration}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Quick Info Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Info</h3>
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
                  {tool.lastUpdated && (
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium">{tool.lastUpdated}</p>
                    </div>
                  )}
                </div>

                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-black text-white text-center py-3 rounded-lg hover:bg-gray-800 transition-colors mt-6 font-semibold"
                >
                  Try {tool.name}
                </a>
              </div>

              {/* Company Information */}
              {tool.companyInfo && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Company Information</h3>

                  {tool.companyInfo.founded && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Founded</p>
                      <p className="font-medium">{tool.companyInfo.founded}</p>
                    </div>
                  )}

                  {tool.companyInfo.headquarters && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Headquarters</p>
                      <p className="font-medium">{tool.companyInfo.headquarters}</p>
                    </div>
                  )}

                  {tool.companyInfo.patent && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Patent</p>
                      <p className="font-medium text-sm">{tool.companyInfo.patent}</p>
                    </div>
                  )}

                  {tool.companyInfo.userStats && (
                    <div className="mb-4">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        {tool.companyInfo.userStats.users && (
                          <div>
                            <p className="text-lg font-bold text-blue-600">{tool.companyInfo.userStats.users}</p>
                            <p className="text-xs text-gray-500">Users</p>
                          </div>
                        )}
                        {tool.companyInfo.userStats.countries && (
                          <div>
                            <p className="text-lg font-bold text-green-600">{tool.companyInfo.userStats.countries}</p>
                            <p className="text-xs text-gray-500">Countries</p>
                          </div>
                        )}
                        {tool.companyInfo.userStats.projects && (
                          <div>
                            <p className="text-lg font-bold text-purple-600">{tool.companyInfo.userStats.projects}</p>
                            <p className="text-xs text-gray-500">Projects</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Support Options */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Support Options</h4>
                    <div className="space-y-2">
                      {tool.companyInfo?.support?.email && (
                        <a href={`mailto:${tool.companyInfo?.support?.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
                          <Mail className="h-4 w-4" />
                          Email Support
                        </a>
                      )}
                      {tool.companyInfo?.support?.chat && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MessageCircle className="h-4 w-4" />
                          Live Chat
                        </div>
                      )}
                      {tool.companyInfo?.support?.documentation && (
                        <a href={tool.companyInfo.support.documentation} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
                          <BookOpen className="h-4 w-4" />
                          Documentation
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Social Media */}
                  {tool.companyInfo.socialMedia && (
                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-medium mb-3">Follow</h4>
                      <div className="flex gap-2">
                        {tool.companyInfo?.socialMedia?.linkedin && (
                          <a href={tool.companyInfo.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
                            <Globe className="h-5 w-5" />
                          </a>
                        )}
                        {tool.companyInfo?.socialMedia?.twitter && (
                          <a href={tool.companyInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                            <MessageCircle className="h-5 w-5" />
                          </a>
                        )}
                        {tool.companyInfo?.socialMedia?.youtube && (
                          <a href={tool.companyInfo.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600">
                            <Play className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Trust Indicators */}
              {tool.companyInfo?.accreditations && tool.companyInfo.accreditations.length > 0 && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold mb-3 text-blue-900">Accreditations</h3>
                  <div className="space-y-2">
                    {tool.companyInfo.accreditations.map((accreditation, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-blue-800">
                        <Award className="h-4 w-4" />
                        {accreditation}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        {category && subcategory && (
          <div className="mt-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Related Tools</h2>
              <p className="text-gray-600 mb-6">
                Discover more {subcategory.name} tools in {category.name}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subcategory.tools
                  .filter(t => t.id !== tool.id) // Exclude current tool
                  .slice(0, 6) // Show up to 6 related tools
                  .map((relatedTool) => (
                    <Link
                      key={relatedTool.id}
                      to={`${generateToolUrl(relatedTool.id)}#tool-content`}
                      className="group bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 p-6 hover:bg-gray-50"
                    >
                      <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                        {relatedTool.image.startsWith('/screenshots/') ? (
                          <img
                            src={relatedTool.image}
                            alt={relatedTool.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                              target.parentElement!.innerHTML = `<div class="text-center text-gray-500 p-4"><div class="text-2xl mb-2">🖼️</div><div class="text-sm">No screenshot available</div><div class="text-xs">${relatedTool.name}</div></div>`;
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <div className="text-center text-gray-500 p-4">
                              <div className="text-2xl mb-2">🛠️</div>
                              <div className="text-sm font-medium">{relatedTool.name}</div>
                              <div className="text-xs mt-1">No screenshot available</div>
                            </div>
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {relatedTool.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedTool.description}
                      </p>
                      {relatedTool.userRating && (
                        <div className="flex items-center gap-1 mt-3">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-900">{relatedTool.userRating}</span>
                        </div>
                      )}
                    </Link>
                  ))}
              </div>

              {/* View All Tools Button */}
              <div className="text-center mt-8">
                <Link
                  to={`/tools/${category.id}/${subcategory.id}`}
                  className="inline-flex items-center bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
                >
                  View All {subcategory.name} Tools
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolDetail;