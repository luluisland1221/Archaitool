import React from 'react';
import { useEffect } from 'react';
import { useSearchParams, useParams, Link, useLocation, Navigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { configuredCategories } from '../data/tools';
import { DynamicScreenshotImage } from '../components/DynamicScreenshotImage';
import { generateToolUrl } from '../utils/urlHelper';

type Insight = {
  overview: string;
  useCases?: string[];
  selectionTips?: string;
  faqs?: { question: string; answer: string }[];
  steps?: string[];
};

const directoryNarrative = {
  hero:
    'Arch AI Tool tracks more than 400 design, construction, and property technology AI experiments every quarter. This directory condenses that research into practical buying notes so studios, developers, and in-house innovation teams can jump straight to the workflows that already ship results.',
  usage: [
    'Start with the category that mirrors your current deliverable—feasibility studies, marketing collateral, tenant-fit plans, or landscaping proposals—and skim the overview to understand what outputs to expect.',
    'Open the relevant subcategory for a deeper explanation of the workflow, such as virtual staging or design automation, and note the interlinked tools to compare turnaround time, export fidelity, and collaboration features.',
    'Use the tool cards to access detail pages where we document pricing models, input requirements, and integration considerations pulled from each vendor’s public roadmap or documentation.',
    'Share shortlisted tool pages with clients or project stakeholders so requirements, licensing, and creative direction are aligned before you invest hours crafting prompts.'
  ],
  checklist: [
    'Confirm the licensing terms for AI-generated imagery, especially for MLS listings, paid advertising, or government submissions.',
    'Review the hardware or browser requirements for each platform so collaborators can reproduce the same results without bottlenecks.',
    'Capture before-and-after mockups or heat maps to document how AI-assisted iterations influenced the final brief—helpful for post-mortems and client education.'
  ],
  faqs: [
    {
      question: 'How often is the directory updated?',
      answer:
        'We refresh the dataset every two weeks. New tools are vetted manually, and major feature launches from existing vendors are annotated on their detail pages once we verify them through official releases or documentation.'
    },
    {
      question: 'Can I request coverage for a missing tool?',
      answer:
        'Yes. Use the contact form to submit the product name, official website, and a short explanation of the workflow. The research desk prioritizes tools with public demos, transparent pricing, and verifiable case studies.'
    }
  ]
};

const categoryInsights: Record<string, Insight> = {
  'real-estate': {
    overview:
      'Real estate teams increasingly rely on AI-generated visuals to shorten listing prep, propose value-add renovations, and keep sales funnels full even when the property is still under construction. The category spans photo-realistic virtual staging, lead-qualifying floor plans, and interactive collateral that helps buyers imagine the potential of a space before scheduling a tour.',
    useCases: [
      'Boutique brokerages can spin up before/after image packages for vacant condos, complete with multiple furniture styles that match their brand playbook.',
      'Developers use AI imagery to test unit finish packages or amenity decks during capital raises, replacing flat CAD exports with lifestyle-driven scenes.',
      'Property managers keep resident portals fresh by previewing lobby refreshes or shared amenity upgrades before contractors arrive.',
      'Short-term rental hosts test seasonal looks and distribute new gallery assets across OTA platforms without waiting for in-person shoots.'
    ],
    selectionTips:
      'When comparing real estate visualization platforms, confirm that exports respect MLS watermark rules, color profiles, and metadata requirements. Evaluate whether the tool produces editable layers for marketing teams, whether it can batch-render multiple rooms from the same project brief, and how credits roll over between busy and slow seasons.',
    faqs: [
      {
        question: 'Can AI staging outputs be used on MLS and luxury portals?',
        answer:
          'Most vendors provide MLS-compliant templates or watermark toggles, but rules differ by market. Always keep before-and-after files to demonstrate transparency, and note any disclosures that must accompany virtually staged media.'
      },
      {
        question: 'What KPIs signal that an AI staging platform is working?',
        answer:
          'Track listing time on market, engagement rates on paid ads, and appointment-to-offer ratios. Teams usually notice improvements within the first two weeks because fresh visuals reset social algorithms and clarify the renovation budget for buyers.'
      }
    ]
  },
  'landscape-design': {
    overview:
      'Landscape designers juggle horticulture constraints, drainage studies, and client aesthetics. The landscape category highlights AI copilots that simulate plant growth, lighting changes, and phasing plans so owners can approve work faster and facilities teams know exactly what maintenance is required.',
    useCases: [
      'Campus planning teams evaluate multiple plaza layouts with AI-generated seasonal studies, ensuring shade, circulation, and accessibility goals are balanced.',
      'Residential designers show homeowners how drought-tolerant plant palettes will mature over five years, reducing uncertainty about maintenance workloads.',
      'Hospitality brands create marketing-ready imagery for outdoor dining transformations without booking a photographer in every region.'
    ],
    selectionTips:
      'Look for models that include robust libraries of regional vegetation, hardscape textures, and irrigation markers. Verify whether the platform exports layered PSD or CAD references so your civil consultant can cross-check grading and code requirements.',
    faqs: [
      {
        question: 'How do these tools help with regulatory submissions?',
        answer:
          'High-resolution AI boards can accompany permit packages to clarify intent. While you still need stamped drawings, planning commissioners appreciate visual narratives showing sun paths, crowd flow, and planting cycles.'
      },
      {
        question: 'Can I reuse prompts across multiple projects?',
        answer:
          'Yes. Many landscape AI tools now support template libraries, letting you reuse zoning-friendly palettes, lighting scenes, and furniture configurations, then tweak only the site-specific elements.'
      }
    ]
  },
  'general-design': {
    overview:
      'The general design category covers multi-disciplinary AI studios capable of switching between architecture, interiors, fabrication concepts, and marketing graphics. They are ideal for innovation teams that prototype new service lines or need a visual assistant that keeps pace with shifting project scopes.',
    useCases: [
      'Strategic design groups build option studies that mix architecture massing, interior palettes, and signage systems in a single workspace.',
      'Fabrication labs explore parametric facades or product packaging, then export geometry to downstream CAD tools.',
      'Agency partners produce client-ready storyboards that move from site context to hero shots without juggling five different tools.'
    ],
    selectionTips:
      'Prioritize platforms with transparent model updates, version control, and the ability to reference brand libraries. Because these tools span multiple domains, governance features—such as role-based access or prompt history—become essential when collaborating across continents.',
    faqs: [
      {
        question: 'How do I keep cross-disciplinary prompts organized?',
        answer:
          'Create a taxonomy per sector or client, and document the camera angles, texture packs, and performance settings that produced approved renders. Many tools now support shared notebooks or tags so teams can reuse proven recipes.'
      },
      {
        question: 'Do general design copilots replace specialist software?',
        answer:
          'They accelerate concepting and storytelling, but you will still rely on BIM, CAD, or DCC software for production documentation. Think of these AI suites as the briefing layer that keeps stakeholders aligned before detailed design begins.'
      }
    ]
  }
};

const subcategoryInsights: Record<string, Insight> = {
  'design-automation': {
    overview:
      'Design automation tools interpret constraints—site setbacks, daylight quotas, circulation ratios—and propose spatial solutions automatically. They are perfect for feasibility studies or repetitious plan types where teams need data-backed options in minutes.',
    useCases: [
      'Developers generate stacking plans for multifamily towers, comparing yield, daylight penetration, and core efficiency.',
      'Corporate workplace teams test multiple desk-to-meeting room ratios before presenting fit-out budgets.',
      'Prefabrication startups feed panel sizes and structural grids into the system to output fabrication drawings.'
    ],
    selectionTips:
      'Check whether the AI can ingest your local codes, adjacency matrices, and cost targets. Automated suggestions are only useful if they respect the rules your permitting authority will enforce.',
    faqs: [
      {
        question: 'How do teams review AI-generated layouts?',
        answer:
          'Most platforms export annotated PDFs or BIM-compatible geometry. Schedule collaborative reviews where architects, planners, and cost managers flag adjustments before locking in a scheme.'
      }
    ]
  },
  'multi-domain-ai': {
    overview:
      'Multi-domain AI copilots coordinate outputs for brand, architectural, and product teams simultaneously. They maintain style consistency, share texture libraries, and let strategists test campaign narratives without rebuilding assets from scratch.',
    steps: [
      'Document the brand story or development thesis once, then reuse it as a global prompt.',
      'Spin up architecture, interior, and marketing variations side-by-side to highlight how the concept evolves.',
      'Export unified storyboards so executives or investors can review everything as a coherent package.'
    ],
    selectionTips:
      'Look for cross-project asset libraries, role-based approvals, and integrations with DAM platforms so marketing, product, and design teams can collaborate without version chaos.'
  },
  'property-visualization': {
    overview:
      'Property-visualization tools turn construction drawings, LiDAR scans, or basic property photos into market-ready narratives. They emphasize storytelling—sunsets, lifestyle props, and curated palettes—to help buyers feel the space before any drywall is hung.',
    useCases: [
      'Pre-sales teams release teaser campaigns for yet-to-be-built towers with cinematic lobby shots and rooftop experiences.',
      'Asset managers model retrofit options for aging offices to convince tenants to renew leases.',
      'Renters receive “choose your finish” configurators so they can upgrade units digitally before move-in.'
    ],
    selectionTips:
      'Audit how quickly the AI adapts when you change material boards or camera paths. You will often iterate daily with marketing and development partners, so the platform must accept feedback loops gracefully.'
  },
  'landscape-planning': {
    overview:
      'Landscape planning copilots interpret topography, zoning overlays, and climate data to produce phased planting guides. They help teams answer “what happens in year five?” instead of just showing the day-one hero shot.',
    useCases: [
      'Municipalities visualize park revitalizations with community-friendly annotations that explain native planting strategies.',
      'Resort designers plan lighting, seating, and water management across sprawling sites without flying the entire team to every location.',
      'Infrastructure teams test bioswale alignments and tree canopies alongside traffic studies to keep engineers and planners aligned.'
    ],
    selectionTips:
      'Ensure the tool references regional plant databases, stormwater rules, and maintenance notes. Otherwise you risk showing inspiring concepts that cannot survive the local climate.'
  },
  'virtual-staging': {
    overview:
      'Virtual staging tools transform empty rooms, dated furniture, or underexposed photography into aspirational interiors. They have become the fastest way to show prospects multiple living styles without renting physical pieces or waiting for golden hour lighting.',
    useCases: [
      'Listing agents stage vacant penthouses with modern, transitional, and luxury moods to appeal to different buyer personas.',
      'Property managers modernize renewal campaigns by showing residents how their current unit could look after cosmetic upgrades.',
      'Home flippers preview renovation plans for lenders or partners before committing to demolition.'
    ],
    selectionTips:
      'Look for granular control over camera corrections, clutter removal, and style presets. The best tools also generate matching detail shots so your marketing collateral feels cohesive.'
  }
};

const Tools = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const location = useLocation();

  // List of newly added tool IDs
  const newToolIds = [
    'ai-architectures',
    'vibe3d',
    '3d-house-planner',
    'floor-plan-ai',
    'floordesign-ai',
    'home-design-ai',
    'dehome-ai',
    'roomlab-app',
    'ai-renovation',
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

  const categoryInsight = selectedCategory ? categoryInsights[selectedCategory.id] : null;
  const subcategoryInsight = selectedSubcategory ? subcategoryInsights[selectedSubcategory.id] : null;

  const queryCategory = searchParams.get('category');
  const querySubcategory = searchParams.get('subcategory');
  const canonicalSegments = [];
  if (finalCategoryId) canonicalSegments.push(finalCategoryId);
  if (finalSubcategoryId) canonicalSegments.push(finalSubcategoryId);
  const canonicalPath = canonicalSegments.length
    ? `/tools/${canonicalSegments.join('/')}`
    : '/tools';
  const normalizedPath = location.pathname.replace(/\/+$/, '') || '/';
  const shouldRedirectQuery =
    normalizedPath === '/tools' &&
    (queryCategory || querySubcategory) &&
    canonicalPath !== '/tools';

  if (shouldRedirectQuery) {
    return <Navigate to={canonicalPath} replace />;
  }

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

  const renderInsightPanel = (label: string, insight?: Insight) => {
    if (!insight) return null;
    return (
      <section className="bg-white rounded-xl shadow-lg p-8 mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How to use {label}</h2>
        <p className="text-gray-700 leading-relaxed mb-6">{insight.overview}</p>
        {insight.useCases && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Where these tools shine</h3>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              {insight.useCases.map((useCase, index) => (
                <li key={index}>{useCase}</li>
              ))}
            </ul>
          </div>
        )}
        {insight.steps && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Suggested workflow</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              {insight.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        )}
        {insight.selectionTips && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Selection tips</h3>
            <p className="text-gray-700">{insight.selectionTips}</p>
          </div>
        )}
        {insight.faqs && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Frequently asked questions</h3>
            <div className="space-y-4">
              {insight.faqs.map((faq, index) => (
                <div key={index}>
                  <p className="font-medium text-gray-900">{faq.question}</p>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    );
  };

  const renderDirectoryIntro = () => (
    <div className="space-y-10 mb-10">
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How to work with the directory</h2>
        <p className="text-gray-700 leading-relaxed mb-6">{directoryNarrative.hero}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Suggested approach</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              {directoryNarrative.usage.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Checklist before adopting</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {directoryNarrative.checklist.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Directory FAQ</h3>
        <div className="space-y-5">
          {directoryNarrative.faqs.map((faq, index) => (
            <div key={index}>
              <p className="font-semibold text-gray-900">{faq.question}</p>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderCategories = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {configuredCategories.map((category) => (
        <Link
          key={category.id}
          to={`/tools/${category.id}`}
          className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <article className="bg-gray-200 p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-gray-100">
            <h2 className="text-2xl font-bold mb-3">{category.name}</h2>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <div className="space-y-2 bg-white p-4 rounded-lg">
              {category.subcategories.map((sub) => (
                <div key={sub.id} className="text-sm text-gray-500">
                  &middot;{sub.name}
                </div>
              ))}
            </div>
          </article>
        </Link>
      ))}
    </div>
  );

  const ToolCard = ({ tool }) => {
    const isNewTool = newToolIds.includes(tool.id);
    const toolDetailUrl = generateToolUrl(tool.id);

    return (
      <article className="group bg-white shadow-lg hover:shadow-2xl transition-all duration-300 relative">
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
        <Link
          to={toolDetailUrl}
          className="absolute inset-0 z-10 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          aria-label={`View ${tool.name} AI tool details`}
        >
          <span className="sr-only">View {tool.name} details</span>
        </Link>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 z-20 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="h-4 w-4 text-gray-600" />
        </a>
      </article>
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
            {renderDirectoryIntro()}
            {renderCategories()}
          </>
        )}

        {selectedCategory && !selectedSubcategory && (
          <>
            <h1 className="text-4xl font-bold mb-8">{selectedCategory.name} - AI Tools & Software</h1>
            {renderInsightPanel(selectedCategory.name, categoryInsight)}
            {renderSubconfiguredCategories(selectedCategory)}
          </>
        )}

        {selectedCategory && selectedSubcategory && (
          <>
            {renderInsightPanel(selectedSubcategory.name, subcategoryInsight)}
            {renderTools(selectedSubcategory)}
          </>
        )}
      </div>
    </div>
  );
};

export default Tools;
