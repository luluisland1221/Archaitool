import React from 'react';

interface StructuredDataProps {
  data: object;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2)
      }}
    />
  );
};

// 生成工具详情页面的结构化数据
export function generateToolStructuredData(tool: any) {
  return {
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
      "name": "Arch AI Tool Directory",
      "url": "https://archaitool.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Arch AI Tool Directory",
      "url": "https://archaitool.com"
    },
    "dateModified": tool.lastUpdated || new Date().toISOString().split('T')[0],
    "aggregateRating": tool.userRating ? {
      "@type": "AggregateRating",
      "ratingValue": tool.userRating,
      "ratingCount": "100+"
    } : undefined,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://archaitool.com/${tool.category}/${tool.id}`
    }
  };
}

// 生成分类页面的结构化数据
export function generateCategoryStructuredData(category: any, tools: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": category.title,
    "description": category.description,
    "url": `https://archaitool.com${category.url}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": tools.length,
      "itemListElement": tools.map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": tool.name,
          "url": `https://archaitool.com/${tool.category}/${tool.id}`,
          "applicationCategory": "DesignApplication"
        }
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://archaitool.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Tools",
          "item": "https://archaitool.com/tools"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": category.title.split(' | ')[0],
          "item": `https://archaitool.com${category.url}`
        }
      ]
    }
  };
}

// 生成主页的结构化数据
export function generateHomepageStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Arch AI Tool",
    "description": "Discover the best AI tools for architecture and design. Your comprehensive guide to AI-powered architectural generation, visualization, interior design, and more.",
    "url": "https://archaitool.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://archaitool.com/tools?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Arch AI Tool Directory",
      "url": "https://archaitool.com"
    }
  };
}

// 生成工具列表页面的结构化数据
export function generateToolsPageStructuredData(tools: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "All AI Architecture Tools - Browse Categories | Arch AI Tool",
    "description": "Browse all AI architecture tools by category. Find the perfect AI tool for architectural design, interior design, landscape design, and more.",
    "url": "https://archaitool.com/tools",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": tools.length,
      "itemListElement": tools.slice(0, 20).map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": tool.name,
          "url": `https://archaitool.com/${tool.category}/${tool.id}`,
          "applicationCategory": "DesignApplication"
        }
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://archaitool.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Tools",
          "item": "https://archaitool.com/tools"
        }
      ]
    }
  };
}