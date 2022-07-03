import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSeidrAuth } from 'seidrui';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Alert, Box, Button, createStyles, Paper, Stack, Text, Title } from '@mantine/core';
import { FormTextField } from '../common/components/Inputs/FormTextField';
import { FormPassword } from '../common/components/Inputs/FormPassword';

import { InfoCircle } from 'tabler-icons-react';

const applyStyles = createStyles(theme => ({
  root: {
    position: 'fixed',
    inset: 0,
  },
  inner: {
    position: 'absolute',
    inset: 0,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
  paper: {
    marginTop: 'auto',
    marginBottom: 'auto',

    padding: theme.spacing.md * 2,
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    paddingTop: theme.spacing.sm,
  },
  content: {
    paddingTop: theme.spacing.lg,
  },
}));

const schema = yup.object({
  username: yup.string('Geben Sie Ihren Benutzernamen ein').required('Benutzername ist erforderlich'),
  password: yup
    .string('Geben Sie Ihr Passwort ein.')
    .min(4, 'Passwort muss mind. 4 Zeichen lang sein.')
    .required('Passwort  ist erforderlich'),
});

function Login() {
  const auth = useSeidrAuth();
  const { classes } = applyStyles();

  const { handleSubmit, control } = useForm({
    mode: 'onTouched',
    defaultValues: { username: 'admin', password: 'admin' },
    resolver: yupResolver(schema),
  });

  const submit = async data => {
    auth.signin(data);
  };

  if (auth.user) {
    return <Navigate to="/" />;
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.inner}>
        <Paper className={classes.paper} withBorder>
          <Title className={classes.title}>Log In</Title>
          <Text color="dimmed" size="sm" mt={5}>
            Loggen Sie sich in die Admin Plattform ein
          </Text>
          <Box className={classes.content}>
            <form onSubmit={auth.isLoading ? null : handleSubmit(submit)}>
              <Stack spacing="sm">
                <Box>
                  <Stack spacing={3}>
                    <FormTextField name="username" label="Benutzername" placeholder="U-Nummer" control={control} />

                    <FormPassword name="password" label="Passwort" placeholder="Passwort" control={control} />
                  </Stack>
                </Box>
                <Stack spacing="xs">
                  <Button sx={{ height: '32px' }} mt="md" type="submit">
                    Log in
                  </Button>

                  <Alert icon={<InfoCircle size={16} />}>
                    <Text size="sm" color="dimmed">
                      Nutzen Sie ihre eBase Daten, um sich einzuloggen.
                    </Text>
                  </Alert>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Login;
