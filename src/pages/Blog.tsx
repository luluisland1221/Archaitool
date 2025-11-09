import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, BookOpen } from 'lucide-react';
import BlogCard from '../components/blog/BlogCard';
import TagFilter from '../components/blog/TagFilter';
import { blogPosts, getPostsByTag } from '../data/blog/posts';
import { blogTags } from '../data/blog/tags';
import { BlogPost } from '../data/blog/types';

const Blog: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;

    // Filter by selected tags
    if (selectedTags.length > 0) {
      posts = posts.filter(post =>
        selectedTags.some(tagId => post.tags.includes(tagId))
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    }

    // Sort by publication date (newest first)
    return posts.sort((a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );
  }, [selectedTags, searchQuery]);

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleClearAll = () => {
    setSelectedTags([]);
  };

  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>ArchAI Blog - AI Architecture Tools Insights & Tutorials</title>
        <meta name="description" content="Discover the latest insights, tutorials, and reviews for AI architecture tools. Learn how to integrate artificial intelligence into your architectural design workflow." />
        <meta name="keywords" content="AI architecture blog, architecture tutorials, AI design tools, architectural technology, AI workflow" />

        {/* Open Graph */}
        <meta property="og:title" content="ArchAI Blog - AI Architecture Tools Insights & Tutorials" />
        <meta property="og:description" content="Discover the latest insights, tutorials, and reviews for AI architecture tools." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://archaitool.com/blog" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ArchAI Blog - AI Architecture Tools Insights & Tutorials" />
        <meta name="twitter:description" content="Discover the latest insights, tutorials, and reviews for AI architecture tools." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <BookOpen className="h-16 w-16" />
              </div>
              <h1 className="text-4xl font-bold mb-4">
                ArchAI Blog
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Expert insights, tutorials, and reviews for AI architecture tools.
                Learn how to leverage artificial intelligence to transform your design workflow.
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>

          <TagFilter
            selectedTags={selectedTags}
            availableTags={blogTags}
            onTagToggle={handleTagToggle}
            onClearAll={handleClearAll}
          />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Featured Posts */}
          {filteredPosts.length === 0 && searchQuery === '' && selectedTags.length === 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {/* Results Header */}
          <div className="mb-8">
            {searchQuery && (
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results for "{searchQuery}"
              </h2>
            )}
            {selectedTags.length > 0 && !searchQuery && (
              <h2 className="text-2xl font-bold text-gray-900">
                Articles in {selectedTags.length} topic{selectedTags.length > 1 ? 's' : ''}
              </h2>
            )}
            {searchQuery && selectedTags.length > 0 && (
              <h2 className="text-2xl font-bold text-gray-900">
                Filtered Results
              </h2>
            )}
            {searchQuery === '' && selectedTags.length === 0 && filteredPosts.length > 3 && (
              <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
            )}
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTags([]);
                }}
                className="text-black hover:text-gray-600 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Coming Soon Articles */}
          {searchQuery === '' && selectedTags.length === 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Coming Soon Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Article 1 */}
                <div className="bg-gray-100 rounded-xl p-6 border-2 border-dashed border-gray-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Coming Soon</span>
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis'}}>
                    Accelerating Architectural Concept Design with AI: A Step-by-Step Workflow from Sketch to Visualization
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis'}}>
                    Learn how to transform your architectural sketches into professional visualizations using AI tools. This comprehensive workflow guide covers everything from initial concept to final presentation.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">15 min read</span>
                    <span className="text-yellow-600 font-medium text-sm">Coming Soon</span>
                  </div>
                </div>

                {/* Article 2 */}
                <div className="bg-gray-100 rounded-xl p-6 border-2 border-dashed border-gray-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Coming Soon</span>
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis'}}>
                    From School to Practice: How to Choose Your First AI Tool as an Architect (2025 Guide)
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis'}}>
                    Transitioning from architecture school to professional practice? This guide helps emerging architects select the right AI tools to kickstart their career and enhance their design workflow.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">12 min read</span>
                    <span className="text-yellow-600 font-medium text-sm">Coming Soon</span>
                  </div>
                </div>

                {/* Article 3 */}
                <div className="bg-gray-100 rounded-xl p-6 border-2 border-dashed border-gray-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Coming Soon</span>
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis'}}>
                    AI Architecture Images Are Getting Unreal—How Architects Can Stay Professional
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis'}}>
                    As AI-generated architectural imagery becomes increasingly photorealistic, discover how architects can maintain professional standards while leveraging these powerful visualization tools.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">10 min read</span>
                    <span className="text-yellow-600 font-medium text-sm">Coming Soon</span>
                  </div>
                </div>

                {/* Article 4 */}
                <div className="bg-gray-100 rounded-xl p-6 border-2 border-dashed border-gray-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Coming Soon</span>
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis'}}>
                    How Small Architecture Firms Can Boost Productivity with AI (2025)
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis'}}>
                    Practical strategies for small architecture firms to implement AI tools effectively. Learn how to maximize ROI, streamline workflows, and compete with larger firms using smart AI solutions.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">18 min read</span>
                    <span className="text-yellow-600 font-medium text-sm">Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;