import React from 'react';
import { useController } from 'react-hook-form';

import { PasswordInput } from '@mantine/core';

export function FormPassword({ control, name, ...props }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return <PasswordInput ref={ref} {...inputProps} error={error ? error.message : null} {...props} />;
}
