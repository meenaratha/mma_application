import { PostCard } from './PostCard';
import type { Post } from '../../types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Grid } from 'react-window';
import type { CellComponentProps } from 'react-window';
import { useResponsive } from '../../hooks/useResponsive';
import { PostCardSkeleton } from './PostCardSkeleton';

interface PostGridProps {
  posts: Post[];
  loading: boolean;
  totalCount?: number;
}

interface CellData {
  posts: Post[];
  columnCount: number;
  showSkeletons: boolean;
}

const MemoPostCard = React.memo(PostCard);

const Cell = ({
    columnIndex,
    rowIndex,
    style,
    posts,
    columnCount,
    showSkeletons,
  }: CellComponentProps<CellData>) => {
    const postIndex = rowIndex * columnCount + columnIndex;
    const post = posts[postIndex];

    if (!post) {
      if (!showSkeletons) {
        return null;
      }

      return (
        <div style={style}>
          <div className="p-2 h-full">
            <PostCardSkeleton />
          </div>
        </div>
      );
    }

    return (
      <div style={style}>
        <div className="p-2 h-full">
            <MemoPostCard post={post} />
        </div>
      </div>
    );
  };

export const PostGrid = React.memo(({ posts, loading, totalCount }: PostGridProps) => {
  const { isMobile, isTablet } = useResponsive();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const updateWidth = () => {
      setContainerWidth(element.clientWidth);
    };

    updateWidth();

    const observer = new ResizeObserver(() => {
      updateWidth();
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const columnCount = isMobile ? 1 : isTablet ? 2 : 4;
  const safeWidth = containerWidth || 0;
  const columnWidth = columnCount > 0 ? safeWidth / columnCount : 0;
  const effectiveTotalCount = totalCount ?? posts.length;
  const rowCount = Math.ceil(effectiveTotalCount / columnCount);
  const rowHeight = 350; // Adjust based on your PostCard height
  const gridHeight = rowCount * rowHeight;
  const cellProps = useMemo(
    () => ({ posts, columnCount, showSkeletons: loading }),
    [posts, columnCount, loading],
  );
  const gridStyle = useMemo(
    () => ({
      height: gridHeight,
      width: safeWidth,
      overflowX: 'hidden' as const,
      overflowY: 'hidden' as const,
      paddingBottom: '50px',
    }),
    [safeWidth, gridHeight],
  );

  if (loading && posts.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-2 md:p-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No posts found</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full">
      <Grid
        cellComponent={Cell}
        cellProps={cellProps}
        columnCount={columnCount}
        columnWidth={columnWidth}
        rowCount={rowCount}
        rowHeight={rowHeight}
        overscanCount={1}
        style={gridStyle} // TODO: Make this height dynamic, e.g., using react-virtualized-auto-sizer
      />
    </div>
  );
});
