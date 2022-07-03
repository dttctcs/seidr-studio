import React from 'react';
import { useMatch, Link as RouterLink } from 'react-router-dom';
import applyStyles from './Link.styles';

import { Button, Text, ThemeIcon } from '@mantine/core';

export function Link({ Icon, label, navbarOpened, ...props }) {
  const selected = useMatch(props.path);
  const { classes } = applyStyles({ selected }, { name: 'Link' });

  return (
    <Button
      px="xs"
      component={RouterLink}
      to={props.path}
      classNames={{
        root: classes.root,
        inner: classes.inner,
        label: classes.label,
        icon: classes.icon,
      }}
      variant="subtle"
      leftIcon={<Icon size={18} />}
      fullWidth
    >
      <Text sx={{ visibility: navbarOpened ? 'visible' : 'hidden' }} size="sm">
        {label}
      </Text>
    </Button>
  );
}
