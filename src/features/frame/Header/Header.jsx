import React from 'react';

import { Header as MantineHeader } from '@mantine/core';
import { UserMenu } from './UserMenu';

export function Header() {
  return (
    <MantineHeader sx={{ display: 'flex', alignItems: 'center' }} height={60} p="xs">
      <UserMenu />
    </MantineHeader>
  );
}
