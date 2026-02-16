import React from 'react';
import type { Post } from '../../types';

interface PostCardProps {
  post: Post;
}

const getMembershipColor = (tier: string): string => {
  switch (tier) {
    case 'Basic Members':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Premium Members':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Diamond Members':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const PostCard = React.memo(({ post }: PostCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getMembershipColor(
              post.membershipTier
            )}`}
          >
            {post.membershipTier}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {post.description}
        </p>

        {(post.type || post.date || post.ageLimit || post.paid) && (
          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            {post.type && (
              <span className="flex items-center gap-1">
                <span className="font-medium">Type:</span> {post.type}
              </span>
            )}
            {post.date && (
              <span className="flex items-center gap-1">
                <span className="font-medium">Date:</span> {post.date}
              </span>
            )}
            {post.ageLimit && (
              <span className="flex items-center gap-1">
                <span className="font-medium">Age:</span> {post.ageLimit}
              </span>
            )}
            {post.paid && (
              <span className="flex items-center gap-1 text-green-600 font-semibold">
                ₹ {post.paid}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
});