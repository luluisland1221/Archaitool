import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Calendar } from 'lucide-react';
import { BlogPost } from '../../data/blog/types';
import { blogTags } from '../../data/blog/tags';

interface BlogCardProps {
  post: BlogPost;
  showTags?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, showTags = true }) => {
  const postTags = post.tags.map(tagId => blogTags.find(t => t.id === tagId)).filter(Boolean);

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="block bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 group"
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
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-black transition-colors">
          {post.title}
        </h2>

        <p className="text-gray-600 mb-4 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis'}}>
          {post.excerpt}
        </p>

        {showTags && postTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {postTags.map((tag) => (
              <span
                key={tag?.id}
                className="px-3 py-1 text-xs font-medium rounded-full"
                style={{
                  backgroundColor: tag?.color || '#1F2937',
                  color: '#FFFFFF'
                }}
              >
                {tag?.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{post.author.name}</span>
          </div>

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
    </Link>
  );
};

export default BlogCard;