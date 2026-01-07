import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, BookOpen, Clock } from 'lucide-react';
import { blogPosts } from '../data/blog/posts';

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

        {/* Search Section */}
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
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
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
            {searchQuery === '' && selectedTags.length === 0 && (
              <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
            )}
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <a
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 block"
                >
                  {post.featuredImage && (
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                      <span>{new Date(post.publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                      <span>{post.readTime} min read</span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-black transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 mb-4 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis'}}>
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{post.author.name}</span>
                      <span className="text-black hover:text-gray-600 font-medium text-sm inline-flex items-center">
                        Read More
                        <svg
                          className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
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

        </div>
      </div>
    </>
  );
};

export default Blog;
