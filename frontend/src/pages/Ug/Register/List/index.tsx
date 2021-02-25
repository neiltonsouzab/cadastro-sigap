import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Typography,
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Chip,
  makeStyles,
  createStyles,
  Theme,
  IconButton,
  InputLabel,
  Input,
  Checkbox,
  ListItemText,
  FormControl,
  Select,
  MenuItem,
  Grid,
} from '@material-ui/core';
import { Add, Search } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import api from '../../../../services/api';
import { useAuth } from '../../../../hooks/auth';

interface Ug {
  id: number;
  code: string;
  name: string;
  short_name: string;
}

const UserList: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  const [selectedsUgs, setSelectedsUgs] = useState<number[]>([]);

  const isAllSelected = useMemo(() => {
    return user.ugs.length === selectedsUgs.length;
  }, [user.ugs, selectedsUgs]);

  const handleToggleAllSelect = useCallback(() => {
    if (user.ugs.length === selectedsUgs.length) {
      setSelectedsUgs([]);
    } else {
      setSelectedsUgs(user.ugs.map((ug) => ug.id));
    }
  }, [user.ugs, selectedsUgs]);

  const handleNavigateToUgRegisterCreate = useCallback(() => {
    history.push('/ugs/registers/create');
  }, [history]);

  return (
    <Box paddingY={4} paddingX={4}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h4" color="textPrimary">
            Registros de UG
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Listagem completa de registros submetidos pelas unidades gestoras.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          size="large"
          startIcon={<Add />}
          color="primary"
          onClick={handleNavigateToUgRegisterCreate}
        >
          NOVO REGISTRO
        </Button>
      </Box>

      <Box marginTop={4}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="demo-mutiple-checkbox-label">UG</InputLabel>
          <Select
            fullWidth
            multiple
            label="UG"
            variant="outlined"
            labelId="ugs-label"
            id="ug-mutiple-checkbox"
            value={selectedsUgs}
            onChange={(event) =>
              setSelectedsUgs(event.target.value as number[])
            }
            renderValue={(value) => {
              const ids = value as number[];
              const ugs = user.ugs.filter((ug) => ids.includes(ug.id));

              return ugs.map((ug) => (
                <Chip
                  color="secondary"
                  key={ug.id}
                  label={`${ug.code} - ${ug.short_name}`}
                  style={{ marginRight: 4 }}
                />
              ));
            }}
          >
            <MenuItem onChange={handleToggleAllSelect}>
              <Checkbox checked={isAllSelected} />
              <ListItemText primary="Selectionar todas" />
            </MenuItem>

            {user.ugs.map((ug) => (
              <MenuItem key={ug.id} value={ug.id} alignItems="flex-start">
                <Checkbox checked={selectedsUgs.includes(ug.id)} />
                <ListItemText
                  primary={`${ug.code} - ${ug.short_name}`}
                  secondary={ug.name}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default UserList;