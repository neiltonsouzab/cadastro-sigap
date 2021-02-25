import React from 'react';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  Person,
  ExitToApp,
  Group,
  AccountBalance,
  NoteAdd,
} from '@material-ui/icons';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { useAuth } from '../../../hooks/auth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      color: '#fff',
      backgroundColor: theme.palette.primary.main,
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  }),
);

const DefaultLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  const { user } = useAuth();

  return (
    <Box>
      <Box
        component="header"
        height={80}
        bgcolor="#FFF"
        boxShadow="0 0 20px rgba(0, 0, 0, 0.05)"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingX={4}
      >
        <Box display="flex" alignItems="center">
          <Avatar className={classes.avatar}>
            <Person fontSize="large" />
          </Avatar>

          <Box marginX={2}>
            <Typography variant="subtitle2">{user.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {user.email}
            </Typography>
          </Box>
        </Box>

        <Box marginRight={2} display="flex">
          <IconButton>
            <Group color="primary" />
          </IconButton>

          <IconButton>
            <AccountBalance color="primary" />
          </IconButton>

          <IconButton>
            <NoteAdd color="primary" />
          </IconButton>

          <Divider
            orientation="vertical"
            flexItem
            style={{
              marginLeft: 8,
              marginRight: 8,
            }}
          />

          <IconButton>
            <ExitToApp color="primary" />
          </IconButton>
        </Box>
      </Box>

      <Box component="main" marginY={2} paddingX={4}>
        <Box
          component="section"
          bgcolor="#FFF"
          boxShadow="0 0 20px rgba(0, 0, 0, 0.05)"
          flex={1}
          borderRadius={10}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DefaultLayout;
