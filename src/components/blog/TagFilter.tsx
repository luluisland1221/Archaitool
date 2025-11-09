import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { BlogTag } from '../../data/blog/types';

interface TagFilterProps {
  selectedTags: string[];
  availableTags: BlogTag[];
  onTagToggle: (tagId: string) => void;
  onClearAll: () => void;
}

const TagFilter: React.FC<TagFilterProps> = ({
  selectedTags,
  availableTags,
  onTagToggle,
  onClearAll
}) => {
  const getTagById = (tagId: string): BlogTag | undefined => {
    return availableTags.find(tag => tag.id === tagId);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter by Topic</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
          >
            <X className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {availableTags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => onTagToggle(tag.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedTags.includes(tag.id)
                ? 'text-white shadow-md transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
            }`}
            style={{
              backgroundColor: selectedTags.includes(tag.id) ? tag.color : undefined
            }}
          >
            {tag.name}
            {selectedTags.includes(tag.id) && (
              <span className="ml-2 inline-flex items-center justify-center w-4 h-4 bg-white/20 rounded-full text-xs">
                <X className="h-3 w-3" />
              </span>
            )}
          </button>
        ))}
      </div>

      {selectedTags.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Active filters:{' '}
            {selectedTags.map(tagId => {
              const tag = getTagById(tagId);
              return tag ? (
                <span
                  key={tagId}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mr-2"
                  style={{
                    backgroundColor: tag.color || '#1F2937',
                    color: '#FFFFFF'
                  }}
                >
                  {tag.name}
                </span>
              ) : null;
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default TagFilter;