import React from 'react';

import { Paper } from '@mantine/core';

export function MainContentPaper({ children, sx, ...props }) {
  return (
    <Paper withBorder sx={sx} {...props}>
      {children}
    </Paper>
  );
}
