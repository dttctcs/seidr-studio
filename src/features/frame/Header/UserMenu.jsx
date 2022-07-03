import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeidrAuth, useSeidrInfo } from 'seidrui';

import { Avatar, Button, createStyles, Divider, Group, Menu, Stack, Text, Title } from '@mantine/core';
import { AppWindow, ChevronDown, IdBadge2, Lock, LockSquare, Logout, Users, User } from 'tabler-icons-react';

const securityRoutes = {
  Users: {
    name: 'Users',
    label: 'Users',
    IconComponent: Users,
  },
  Roles: {
    name: 'Roles',
    label: 'Roles',
    IconComponent: IdBadge2,
  },
  Permissions: {
    name: 'Permissions',
    label: 'Base Permissions',
    IconComponent: Lock,
  },
  PermissionView: {
    name: 'PermissionView',
    label: 'Permission on Views',
    IconComponent: LockSquare,
  },
  Viewsmenus: {
    name: 'Viewsmenus',
    label: 'Views/Menus',
    IconComponent: AppWindow,
  },
};

const applyStyles = createStyles((theme) => ({
  root: {
    marginLeft: 'auto',
  },
  user: {
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',
  },
  avatar: {
    color: theme.colors[theme.primaryColor][theme.fn.primaryShade()],
  },
  label: {
    fontWeight: 700,
    color: theme.colors.dark[9],
  },
  item: {
    paddingTop: '6px',
    paddingBottom: '6px',
  },
}));

export function UserMenu() {
  const { classes } = applyStyles();
  const { user, signout } = useSeidrAuth();
  const { apis } = useSeidrInfo();
  let navigate = useNavigate();

  const handleLogout = () => {
    signout();
  };

  const securityApis = apis.filter((api) => api.level === 'security' && user.permissions.includes(api.permission_name));
  return (
    <Menu
      classNames={{ root: classes.root, label: classes.label, item: classes.item }}
      control={
        <Button className={classes.user} size="xs" variant="subtle">
          <Group spacing={7}>
            <Avatar
              classNames={{ placeholderIcon: classes.avatar }}
              src={user.image}
              alt={user.last_name}
              radius="xl"
              size={24}
            />
            <Title order={6}>
              {user.first_name} {user.last_name}
            </Title>
            <ChevronDown size={12} />
          </Group>
        </Button>
      }
    >
      <Stack p="xs" spacing={0}>
        <Group sx={{ gap: 2 }} spacing={0}>
          <Title order={6}>Welcome, </Title>
          <Text sx={{ marginTop: '-2px' }} size="xs">
            {user.username}
          </Text>
        </Group>
        <Text size="xs" color="dimmed">
          {user.roles.map((role) => role.name).join(', ')}{' '}
        </Text>
      </Stack>
      <Divider sx={{ my: 2 }} />
      {securityApis.length ? (
        <>
          <Menu.Label sx={{ typography: 'subtitle2', p: 0.5, mt: 1, mb: 0.5 }}>Security</Menu.Label>{' '}
          {securityApis.map((api, index) => {
            if (user.permissions.includes(api.permission_name) && securityRoutes[api.name]) {
              const IconComponent = securityRoutes[api.name].IconComponent;
              const label = securityRoutes[api.name].label;

              return (
                <Menu.Item
                  key={index}
                  component="nav"
                  icon={<IconComponent size={16} color="gray" />}
                  onClick={() => navigate(api.path)}
                >
                  <Text size="xs" color="dimmed">
                    {label}
                  </Text>
                </Menu.Item>
              );
            }
            return null;
          })}
        </>
      ) : null}

      <Menu.Label sx={{ typography: 'subtitle2', p: 0.5, mt: 1, mb: 0.5 }}>User</Menu.Label>

      <Menu.Item icon={<User size={16} color="gray" />} onClick={() => navigate('profile')}>
        <Text size="xs" color="dimmed">
          Profile
        </Text>
      </Menu.Item>

      <Menu.Item icon={<Logout size={16} color="gray" />} onClick={handleLogout}>
        <Text size="xs" color="dimmed">
          Logout
        </Text>
      </Menu.Item>
    </Menu>
  );
}
