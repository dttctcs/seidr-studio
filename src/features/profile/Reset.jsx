import React from 'react';
import { useSeidrAuth } from 'seidrui';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Group, Modal, Stack } from '@mantine/core';
import { FormTextField } from '../../common/components/Inputs/FormTextField';

const schema = yup.object({
  password: yup
    .string('Enter your password')
    .min(4, 'Password has to be at least 4 characters long')
    .required('Password is required'),
  confirmPassword: yup
    .string('Enter your password')
    .min(4, 'Password has to be at least 4 characters long')
    .required('Password is required'),
});

export function Reset({ opened, onClose }) {
  const { resetPassword } = useSeidrAuth();

  const { handleSubmit, control, reset } = useForm({
    mode: 'onTouched',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await resetPassword(data);
    onClose();
    reset();
  };

  return (
    <Modal opened={opened} title="Reset Password" onClose={() => onClose()} centered>
      <Stack sx={{ pt: 3 }} spacing={3}>
        <FormTextField name="password" control={control} label="Password*" />
        <FormTextField name="confirmPassword" control={control} label="Confirm Password*" />
      </Stack>

      <Group position="right" mt="xs">
        <Button onClick={handleSubmit(onSubmit)}>Save</Button>
      </Group>
    </Modal>
  );
}
