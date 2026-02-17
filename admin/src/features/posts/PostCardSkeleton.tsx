import React from 'react';
import { Skeleton } from '@mui/material';
import { Box } from '@mui/material';

export const PostCardSkeleton: React.FC = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Skeleton variant="rectangular" width="100%" height={192} />
      <Box sx={{ pt: 1.5, px: 1.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Skeleton width="80%" />
        <Skeleton width="100%" />
        <Skeleton width="70%" />
        <Box sx={{ mt: 'auto' }}>
          <Skeleton width="60%" />
        </Box>
      </Box>
    </Box>
  );
};
