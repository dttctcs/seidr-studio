import React, { useState } from 'react';
import { useSeidrAuth } from 'seidrui';

import { Button, Divider, Group, Paper, Stack, Title } from '@mantine/core';
import { MainContentPaper } from '../common/components/Miscellaneous';
import { Edit, Reset, Row } from '../features/profile';

import { Pencil, Lock } from 'tabler-icons-react';

export default function Profile() {
  const { user } = useSeidrAuth();
  const [editOpened, setEditOpened] = useState(false);
  const [resetOpened, setResetOpened] = useState(false);

  return (
    <MainContentPaper sx={{ flex: 1, flexDirection: 'column' }} p="md">
      <Stack spacing="md">
        <Paper withBorder>
          <Title p="md" order={5}>
            User Data
          </Title>
          <Divider mx={0} />

          <Stack p="md" spacing="md">
            <Row name="Username" value={user.username} />
            <Row name="Active" value={user.active} />
            <Row name="Roles" value={user.roles.map((role, index) => role.name)} />
            <Row name="Login Count" value={user.login_count} />
          </Stack>
        </Paper>

        <Paper withBorder>
          <Title p="md" order={5}>
            Personal Data
          </Title>
          <Divider mx={0} />
          <Stack p="md" spacing="md">
            <Row name="First Name" value={user.first_name} />
            <Row name="Last Name" value={user.last_name} />
            <Row name="Email" value={user.email} />
          </Stack>
        </Paper>
        <Group position="right" mt="xs">
          <Button leftIcon={<Pencil size={16} />} onClick={() => setEditOpened(true)}>
            Edit Profile
          </Button>
          <Button leftIcon={<Lock size={16} />} onClick={() => setResetOpened(true)}>
            Reset Password
          </Button>
        </Group>
      </Stack>
      <Edit opened={editOpened} onClose={() => setEditOpened(false)} />
      <Reset opened={resetOpened} onClose={() => setResetOpened(false)} />
    </MainContentPaper>
  );
}
