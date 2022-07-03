import React, { useState } from 'react';
import { useSeidrAuth } from 'seidrui';

import { Box, styled, Table, TableBody, TableRow, TableCell, CircularProgress, Button, Stack } from '@mantine/core';
import MainContentPaper from 'common/components/Miscellaneous/MainContentPaper';
import MainContentInnerPaper from 'common/components/Layout/MainContentInnerPaper';
import EditProfileDialog from './EditProfileDialog';
import ResetPasswordDialog from './ResetPasswordDialog';

import { Edit, LockReset } from '@mui/icons-material';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  marginTop: theme.spacing(7),
  '& .MuiTableCell-root': {
    border: 0,
    color: theme.palette.grey[600],

    '&:first-Child': {
      paddingLeft: theme.spacing(3),
      ...theme.typography.body2,

      fontWeight: '500',
      color: 'inherit',
    },
    '&:last-Child': {
      paddingRight: theme.spacing(3),
    },
  },
}));

const StyledTable = styled(Table)(({ theme }) => ({
  border: 0,
}));

function UserInformation() {
  const { user } = useAuth();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);

  return (
    <MainContentPaper sx={{ p: 3 }}>
      <Stack spacing={3}>
        <MainContentInnerPaper>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',

              p: 2.5,

              typography: 'h5',

              fontWeight: '500',

              borderBottomWidth: '1px',
              borderBottomStyle: 'solid',
              borderColor: theme => theme.palette.primary.main + 55,
            }}
          >
            <Box>User Data</Box>
          </Box>
          {user ? (
            <Box>
              <StyledTable>
                <TableBody>
                  <StyledTableRow>
                    <TableCell>Username</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell>{user.username}</TableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <TableCell>Active</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell>{user.active.toString()}</TableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <TableCell>Roles</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell>{user.roles.map((role, index) => role.name)}</TableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <TableCell>Login Count</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell>{user.login_count}</TableCell>
                  </StyledTableRow>
                </TableBody>
              </StyledTable>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 2,
              }}
            >
              <CircularProgress size={28} />
            </Box>
          )}
        </MainContentInnerPaper>

        <MainContentInnerPaper>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',

              p: 2.5,

              typography: 'h5',
              fontSize: '1rem',
              fontWeight: '500',

              borderBottomWidth: '1px',
              borderBottomStyle: 'solid',
              borderColor: theme => theme.palette.primary.main + 55,
            }}
          >
            <Box>Personal Data</Box>
          </Box>
          {user ? (
            <Box>
              <StyledTable>
                <TableBody>
                  <StyledTableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell>{user.first_name}</TableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <TableCell>Last Name</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>:</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </StyledTableRow>
                </TableBody>
              </StyledTable>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 2,
              }}
            >
              <CircularProgress size={28} />
            </Box>
          )}
        </MainContentInnerPaper>
        <Box>
          <Stack direction="row" spacing={3}>
            <Button
              startIcon={<Edit />}
              variant="contained"
              onClick={() => {
                setEditDialogOpen(true);
              }}
            >
              Edit Profile
            </Button>
            <Button
              startIcon={<LockReset />}
              variant="contained"
              onClick={() => {
                setResetPasswordDialogOpen(true);
              }}
            >
              Reset Password
            </Button>
          </Stack>
        </Box>
      </Stack>
      <EditProfileDialog
        profile={user}
        open={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
        }}
      />
      <ResetPasswordDialog
        profile={user}
        open={resetPasswordDialogOpen}
        onClose={() => {
          setResetPasswordDialogOpen(false);
        }}
      />
    </MainContentPaper>
  );
}

export default UserInformation;
