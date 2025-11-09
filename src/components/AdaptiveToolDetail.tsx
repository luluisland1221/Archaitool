import React from 'react';
import { Tool } from '../data/tools';
import { evaluateToolDataQuality, createFallbackInfo } from '../utils/toolDataUtils';
import {
  Check, Award, Globe, Users, Zap, Building2, Cpu, Palette, Clock,
  Mail, MessageCircle, BookOpen, Star, AlertCircle, Info
} from 'lucide-react';

interface AdaptiveToolDetailProps {
  tool: Tool;
}

export const AdaptiveToolDetail: React.FC<AdaptiveToolDetailProps> = ({ tool }) => {
  const quality = evaluateToolDataQuality(tool);

  // Get tool data with fallbacks
  const toolData = {
    keyFeatures: tool.keyFeatures || createFallbackInfo(tool, 'keyFeatures'),
    useCases: tool.useCases || createFallbackInfo(tool, 'useCases'),
    technicalSpecs: tool.technicalSpecs || createFallbackInfo(tool, 'technicalSpecs'),
    pricing: tool.pricing || createFallbackInfo(tool, 'pricing'),
    integrations: tool.integrations || [],
    companyInfo: tool.companyInfo || createFallbackInfo(tool, 'companyInfo')
  };

  const showDataQualityIndicator = quality.level === 'basic' || quality.level === 'standard';

  return (
    <div className="space-y-8">
      {/* Data Quality Indicator */}
      {showDataQualityIndicator && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">Information Status:</span>
            <span className="capitalize">{quality.level}</span>
            <span className="text-amber-600">({quality.score}/100)</span>
          </div>
          <p className="text-sm text-amber-700 mt-1">
            We're still gathering detailed information for this tool. Some sections show default content based on the tool category.
          </p>
        </div>
      )}

      {/* Key Features */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Key Features
          {tool.keyFeatures ? (
            <span className="ml-2 text-sm font-normal text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
              Verified
            </span>
          ) : (
            <span className="ml-2 text-sm font-normal text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
              Default
            </span>
          )}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toolData.keyFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
              <Check className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Overview</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {tool.detailedDescription || tool.description}
          {!tool.detailedDescription && (
            <span className="ml-2 text-sm text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
              Basic Info
            </span>
          )}
        </p>
      </div>

      {/* Technical Specifications */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Technical Specifications
          {tool.technicalSpecs ? (
            <span className="ml-2 text-sm font-normal text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
              Verified
            </span>
          ) : (
            <span className="ml-2 text-sm font-normal text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
              Default
            </span>
          )}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {toolData.technicalSpecs.supportedFormats && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Supported Formats</h3>
              <div className="flex flex-wrap gap-2">
                {toolData.technicalSpecs.supportedFormats.map((format, index) => (
                  <span key={index} className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm">
                    {format}
                  </span>
                ))}
              </div>
            </div>
          )}

          {toolData.technicalSpecs.exportOptions && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Export Options</h3>
              <div className="flex flex-wrap gap-2">
                {toolData.technicalSpecs.exportOptions.map((option, index) => (
                  <span key={index} className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-sm">
                    {option}
                  </span>
                ))}
              </div>
            </div>
          )}

          {toolData.technicalSpecs.systemRequirements && (
            <div className="md:col-span-2">
              <h3 className="font-semibold text-gray-900 mb-2">System Requirements</h3>
              <ul className="space-y-1">
                {toolData.technicalSpecs.systemRequirements.map((req, index) => (
                  <li key={index} className="text-gray-700">• {req}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {toolData.technicalSpecs.collaboration !== undefined && (
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Collaboration: {toolData.technicalSpecs.collaboration ? 'Yes' : 'No'}</span>
              </div>
            )}
            {toolData.technicalSpecs.apiAvailable !== undefined && (
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">API Available: {toolData.technicalSpecs.apiAvailable ? 'Yes' : 'No'}</span>
              </div>
            )}
            {toolData.technicalSpecs.mobileSupport !== undefined && (
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-500" />
                <span className="text-gray-700">Mobile Support: {toolData.technicalSpecs.mobileSupport ? 'Yes' : 'No'}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Use Cases
          {tool.useCases ? (
            <span className="ml-2 text-sm font-normal text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
              Verified
            </span>
          ) : (
            <span className="ml-2 text-sm font-normal text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
              Default
            </span>
          )}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toolData.useCases.map((useCase, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <Award className="h-5 w-5 text-gray-600 flex-shrink-0" />
              <span className="text-gray-700">{useCase}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Information */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Pricing
          {tool.pricing ? (
            <span className="ml-2 text-sm font-normal text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
              Verified
            </span>
          ) : (
            <span className="ml-2 text-sm font-normal text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
              Default
            </span>
          )}
        </h2>

        {toolData.pricing.freeTier && (
          <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Free Plan</h3>
            <ul className="space-y-2">
              {toolData.pricing.freeTier.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <Check className="h-4 w-4" />
                  {feature}
                </li>
              ))}
            </ul>
            {toolData.pricing.freeTier.limitations && (
              <div className="mt-4 text-sm text-gray-700">
                <strong>Limitations:</strong>
                <ul className="mt-1 space-y-1">
                  {toolData.pricing.freeTier.limitations.map((limitation, index) => (
                    <li key={index}>• {limitation}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {toolData.pricing.paid?.plans && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Paid Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {toolData.pricing.paid.plans.map((plan, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold">{plan.name}</h4>
                    <span className="text-2xl font-bold text-gray-800">{plan.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{plan.targetUser}</p>
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <Check className="h-4 w-4 text-gray-600" />
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
          {toolData.pricing.trialAvailable && (
            <span className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              Free trial available
            </span>
          )}
          {toolData.pricing.enterprisePlan && (
            <span className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              Enterprise plan available
            </span>
          )}
        </div>
      </div>

      {/* Integrations */}
      {(tool.integrations && tool.integrations.length > 0) && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Integrations
            <span className="ml-2 text-sm font-normal text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
              Verified
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {toolData.integrations.map((integration, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200">
                <Globe className="h-5 w-5 text-gray-600 flex-shrink-0" />
                <span className="text-gray-700">{integration}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missing Information Notice */}
      {quality.missingSections.length > 0 && quality.level !== 'premium' && (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-gray-800 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Help Us Improve This Page</h3>
              <p className="text-black text-sm mb-3">
                We're working to gather more detailed information about {tool.name}.
                The following sections could use more research: {quality.missingSections.join(', ')}.
              </p>
              <div className="text-xs text-gray-800">
                This is a crowdsourced directory. Information accuracy helps the architecture community make better tool decisions.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};