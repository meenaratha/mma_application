import { PostCard } from './PostCard';
import type { Post } from '../../types';
import React from 'react';

interface PostGridProps {
  posts: Post[];
}

export const PostGrid = React.memo(({ posts }: PostGridProps) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No posts found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
});