import React from 'react';

import { Grid, Text } from '@mantine/core';
export function Row({ name, value }) {
  return (
    <Grid>
      <Grid.Col span={4}>
        <Text size="md" sx={{}}>
          {name}
        </Text>
      </Grid.Col>
      <Grid.Col size="md" span={1}>
        <Text color="dimmed">:</Text>
      </Grid.Col>
      <Grid.Col span={4}>
        <Text size="md" color="dimmed" sx={{}}>
          {value}
        </Text>
      </Grid.Col>
    </Grid>
  );
}
