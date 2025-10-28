import React from 'react';
import { configuredCategories } from '../data/tools';
import { ResearchDashboard } from '../components/ResearchDashboard';

const ResearchManagement = () => {
  // Get all tools from all categories
  const allTools = configuredCategories.flatMap(category =>
    category.subcategories.flatMap(subcategory => subcategory.tools)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <ResearchDashboard tools={allTools} />
    </div>
  );
};

export default ResearchManagement;