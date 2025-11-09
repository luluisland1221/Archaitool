import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, User, Calendar, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import { getPostBySlug } from '../data/blog/posts';
import { getTagById } from '../data/blog/tags';
import NotFound from './NotFound';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = getPostBySlug(slug || '');

  useEffect(() => {
    if (!post) {
      navigate('/blog', { replace: true });
    }
  }, [post, navigate]);

  if (!post) {
    return <NotFound />;
  }

  const postTags = post.tags.map(tagId => getTagById(tagId)).filter(Boolean);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | ArchAI Blog</title>
        <meta name="description" content={post.seo.description} />
        <meta name="keywords" content={post.seo.keywords.join(', ')} />

        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.seo.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://archaitool.com/blog/${post.slug}`} />
        {post.featuredImage && (
          <meta property="og:image" content={post.featuredImage} />
        )}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.seo.description} />
        {post.featuredImage && (
          <meta name="twitter:image" content={post.featuredImage} />
        )}

        {/* Article Meta */}
        <meta property="article:published_time" content={post.publishedDate} />
        <meta property="article:author" content={post.author.name} />
        {postTags.map(tag => (
          <meta key={tag?.id} property="article:tag" content={tag?.name} />
        ))}

        {/* Custom styles for blog content */}
        <style>{`
          .blog-content {
            font-size: 18px;
            line-height: 1.8;
          }

          .blog-content h2 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #000;
            margin-top: 2rem;
            margin-bottom: 1rem;
            padding-bottom: 0.25rem;
            border-bottom: 1px solid #e5e7eb;
          }

          .blog-content h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #111827;
            margin-top: 1.75rem;
            margin-bottom: 0.75rem;
          }

          .blog-content h4 {
            font-size: 1.125rem;
            font-weight: 600;
            color: #1f2937;
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
          }

          .blog-content p {
            margin-bottom: 1.5rem;
            color: #374151;
          }

          .blog-content a {
            color: #000;
            text-decoration: underline;
            font-weight: 500;
            transition: all 0.2s ease;
            text-decoration-thickness: 2px;
            text-underline-offset: 2px;
          }

          .blog-content a:hover {
            color: #374151;
            text-decoration-color: #374151;
          }

          .blog-content ul, .blog-content ol {
            margin: 1.5rem 0;
            padding-left: 2rem;
          }

          .blog-content li {
            margin-bottom: 0.75rem;
            color: #374151;
          }

          .blog-content li strong {
            color: #111827;
            font-weight: 600;
          }

          .blog-content blockquote {
            border-left: 4px solid #000;
            margin: 2rem 0;
            padding: 1rem 1.5rem;
            background-color: #f9fafb;
            font-style: italic;
            color: #4b5563;
          }

          .blog-content strong, .blog-content b {
            color: #111827;
            font-weight: 600;
          }

          .blog-content code {
            background-color: #f3f4f6;
            padding: 0.125rem 0.375rem;
            border-radius: 0.25rem;
            font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
            font-size: 0.875rem;
            color: #1f2937;
          }

          .blog-content pre {
            background-color: #1f2937;
            color: #f9fafb;
            padding: 1.5rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin: 2rem 0;
          }

          .blog-content pre code {
            background-color: transparent;
            color: inherit;
            padding: 0;
          }
        `}</style>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Back to Blog */}
        <div className="bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 text-white font-medium transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <div className="bg-black text-white pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-300 mb-6">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishedDate)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{post.author.name}</span>
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              {postTags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {postTags.map((tag) => (
                    <Link
                      key={tag?.id}
                      to={`/blog?tag=${tag?.slug}`}
                      className="px-4 py-2 text-sm font-medium rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 border border-white/20 text-white hover:scale-105 hover:shadow-lg"
                    >
                      {tag?.name}
                    </Link>
                  ))}
                </div>
              )}

              {post.featuredImage && (
                <div className="rounded-xl overflow-hidden mb-8">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
            {/* Author Bio */}
            <div className="flex items-start justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                {post.author.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-12 w-12 rounded-full"
                  />
                ) : (
                  <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                  {post.author.bio && (
                    <p className="text-sm text-gray-600">{post.author.bio}</p>
                  )}
                </div>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <div
                className="blog-content text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Related Posts */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="text-center">
                <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Continue Reading
                </h3>
                <p className="text-gray-600 mb-6">
                  Explore more articles about AI architecture tools and design workflows.
                </p>
                <Link
                  to="/blog"
                  className="inline-flex items-center px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 hover:scale-105 hover:shadow-lg font-medium"
                >
                  View All Articles
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;