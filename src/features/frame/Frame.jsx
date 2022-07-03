import React from 'react';
import { useSeidrInfo } from 'seidrui';
import { Outlet } from 'react-router';

import { AppShell, Box } from '@mantine/core';
import { Header } from './Header';
import { Navbar } from './Navbar';

export function Frame() {
  const { apis } = useSeidrInfo();

  if (!apis) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppShell
        styles={{
          root: {
            position: 'fixed',
            inset: 0,

            display: 'flex',
            flexDirection: 'column',
          },
          body: {
            height: '100%',
          },
          main: {
            height: '100%',
            display: 'flex',
          },
        }}
        header={<Header height={60} p="xs" />}
        navbar={<Navbar height={60} p="xs" />}
      >
        <Outlet />
      </AppShell>
    </Box>
  );
}
