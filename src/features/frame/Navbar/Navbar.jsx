import React, { useState } from 'react';
import { useSeidrInfo } from 'seidrui';

import { ActionIcon, Divider, Navbar as MantineNavbar, Stack, Title } from '@mantine/core';
import { Link } from './Link';
import * as icons from 'tabler-icons-react';

export function Navbar() {
  const { apis } = useSeidrInfo();
  const [opened, setOpened] = useState(true);

  const filteredApis = apis.filter((api) => api.level !== 'security' && api.type !== 'default');
  const sections = apis.reduce((acc, api) => {
    if (api.type !== 'default' && api.type !== 'security') {
      if (!acc.includes(api.type)) {
        acc.push(api.type);
      }
    }
    return acc;
  }, []);

  const LayoutSidebarLeftCollapse = icons['LayoutSidebarLeftCollapse'];
  const LayoutSidebarLeftExpand = icons['LayoutSidebarLeftExpand'];
  return (
    <MantineNavbar
      sx={{
        width: opened ? '216px' : '64px',
        transition: 'width 0.2s ease-in-out',
      }}
      p="xs"
    >
      <MantineNavbar.Section sx={{ display: 'flex', justifyContent: 'flex-end' }} mt="xs">
        <ActionIcon
          sx={(theme) => ({ color: theme.colors.gray[6], marginRight: '6px' })}
          onClick={() => setOpened(!opened)}
        >
          {opened ? <LayoutSidebarLeftCollapse /> : <LayoutSidebarLeftExpand />}
        </ActionIcon>
      </MantineNavbar.Section>
      <MantineNavbar.Section grow>
        <MantineNavbar.Section grow mx="-xs" px="xs">
          {sections.map((section) => {
            const name = section === 'crud' ? 'Table' : section;
            return (
              <React.Fragment key={section}>
                {opened ? (
                  <Title sx={(theme) => ({ paddingBottom: theme.spacing.sm })} order={6}>
                    Table
                  </Title>
                ) : (
                  <Divider my="md" />
                )}
                <Stack sx={{ gap: 4 }} spacing={0}>
                  {filteredApis.map((api) => (
                    <Link key={api.path} label={api.name} Icon={icons[api.icon]} navbarOpened={opened} {...api} />
                  ))}
                </Stack>
              </React.Fragment>
            );
          })}
        </MantineNavbar.Section>
      </MantineNavbar.Section>
      <MantineNavbar.Section>{/* Footer with user */}</MantineNavbar.Section>
    </MantineNavbar>
  );
}
