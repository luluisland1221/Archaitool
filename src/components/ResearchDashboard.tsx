import React, { useState } from 'react';
import { Tool } from '../data/tools';
import {
  evaluateToolDataQuality,
  createResearchPlan,
  generateResearchTemplate,
  getToolsByQuality
} from '../utils/toolDataUtils';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Target,
  FileText,
  Download,
  ExternalLink,
  Search,
  Filter,
  ChevronRight
} from 'lucide-react';

interface ResearchDashboardProps {
  tools: Tool[];
}

export const ResearchDashboard: React.FC<ResearchDashboardProps> = ({ tools }) => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [showTemplate, setShowTemplate] = useState(false);

  const researchPlan = createResearchPlan(tools);
  const toolsByQuality = getToolsByQuality(tools);

  // Filter tools based on quality level
  const filteredTools = tools.filter(tool => {
    const quality = evaluateToolDataQuality(tool);
    if (filterLevel === 'all') return true;
    return quality.level === filterLevel;
  });

  const getQualityIcon = (level: string) => {
    switch (level) {
      case 'premium':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'comprehensive':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'standard':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'basic':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getQualityColor = (level: string) => {
    switch (level) {
      case 'premium':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'comprehensive':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'standard':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'basic':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const exportResearchPlan = () => {
    const planText = generateResearchPlanText();
    const blob = new Blob([planText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'research-plan.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateResearchPlanText = () => {
    let text = '# Tool Information Research Plan\n\n';
    text += `Total Tools: ${tools.length}\n`;
    text += `Tools Needing Research: ${researchPlan.totalResearch}\n\n`;

    Object.entries(researchPlan.batched).forEach(([priority, batch]) => {
      if (batch.length > 0) {
        text += `## ${priority.charAt(0).toUpperCase() + priority.slice(1).replace('_', ' ')} (${batch.length} tools)\n\n`;
        batch.forEach(tool => {
          const quality = evaluateToolDataQuality(tool);
          text += `### ${tool.name} (Score: ${quality.score}/100)\n`;
          text += `- URL: ${tool.url}\n`;
          text += `- Category: ${tool.category} / ${tool.subcategory}\n`;
          if (quality.missingSections.length > 0) {
            text += `- Missing: ${quality.missingSections.join(', ')}\n`;
          }
          text += '\n';
        });
      }
    });

    return text;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Research Dashboard</h1>
        <p className="text-gray-600">
          Manage and track tool information research progress
        </p>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tools</p>
              <p className="text-2xl font-bold text-gray-900">{tools.length}</p>
            </div>
            <Target className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Need Research</p>
              <p className="text-2xl font-bold text-red-600">{researchPlan.totalResearch}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-amber-600">{researchPlan.batched.high_priority.length}</p>
            </div>
            <Clock className="h-8 w-8 text-amber-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Complete</p>
              <p className="text-2xl font-bold text-green-600">{researchPlan.batched.complete.length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <Filter className="h-4 w-4" />
              Filter:
            </label>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="all">All Tools</option>
              <option value="basic">Basic Info Only</option>
              <option value="standard">Standard</option>
              <option value="comprehensive">Comprehensive</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportResearchPlan}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              <Download className="h-4 w-4" />
              Export Plan
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tools List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Tools ({filteredTools.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {filteredTools.map((tool) => {
                const quality = evaluateToolDataQuality(tool);
                return (
                  <div
                    key={tool.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedTool(tool)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          {getQualityIcon(quality.level)}
                          <h3 className="font-medium text-gray-900">{tool.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full border ${getQualityColor(quality.level)}`}>
                            {quality.score}/100
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {tool.category} / {tool.subcategory}
                        </p>
                        {quality.missingSections.length > 0 && (
                          <p className="text-xs text-amber-600 mt-1">
                            Missing: {quality.missingSections.slice(0, 3).join(', ')}
                            {quality.missingSections.length > 3 && ` +${quality.missingSections.length - 3} more`}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tool Details & Research Template */}
        <div className="lg:col-span-1">
          {selectedTool ? (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedTool.name}
                  </h2>
                  <a
                    href={selectedTool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    {getQualityIcon(evaluateToolDataQuality(selectedTool).level)}
                    <span className="text-sm font-medium text-gray-700">
                      Quality Score: {evaluateToolDataQuality(selectedTool).score}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${evaluateToolDataQuality(selectedTool).score}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Available Info:</h3>
                    <div className="flex flex-wrap gap-1">
                      {evaluateToolDataQuality(selectedTool).availableSections.map(section => (
                        <span key={section} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {section}
                        </span>
                      ))}
                    </div>
                  </div>

                  {evaluateToolDataQuality(selectedTool).missingSections.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Needs Research:</h3>
                      <div className="flex flex-wrap gap-1">
                        {evaluateToolDataQuality(selectedTool).missingSections.map(section => (
                          <span key={section} className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                            {section}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setShowTemplate(!showTemplate)}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  <FileText className="h-4 w-4" />
                  {showTemplate ? 'Hide' : 'Show'} Research Template
                </button>

                {showTemplate && (
                  <div className="mt-4 p-4 bg-gray-50 rounded border">
                    <h3 className="font-medium text-gray-900 mb-2">Research Template</h3>
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                      {generateResearchTemplate(selectedTool)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Select a tool to view details and research template</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};