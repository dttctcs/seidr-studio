import React from 'react';
import { useSeidrAuth } from 'seidrui';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Group, Modal, Stack } from '@mantine/core';
import { FormTextField } from '../../common/components/Inputs/FormTextField';

const schema = yup.object({
  firstname: yup.string('Enter your first name.').required('First name is required'),
  lastname: yup.string('Enter your last name.').required('Last name is required'),
});

export function Edit({ opened, onClose }) {
  const { user, update } = useSeidrAuth();
  const { handleSubmit, control, reset } = useForm({
    mode: 'onTouched',
    defaultValues: {
      firstname: user.first_name,
      lastname: user.last_name,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await update(data);
    onClose();
    reset();
  };

  return (
    <Modal opened={opened} title="Edit Profile" onClose={() => onClose()} centered>
      <Stack sx={{ pt: 3 }} spacing={3}>
        <FormTextField name="firstname" control={control} label="First Name*" />
        <FormTextField name="lastname" control={control} label="Last Name*" />
      </Stack>

      <Group position="right" mt="xs">
        <Button onClick={handleSubmit(onSubmit)}>Save</Button>
      </Group>
    </Modal>
  );
}
