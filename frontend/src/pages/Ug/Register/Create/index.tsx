import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  ListItem,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  ListSubheader,
  Button,
  Divider,
} from '@material-ui/core';
import {
  ArrowBack,
  Description,
  Delete,
  Add,
  CloudUpload,
  GetApp,
} from '@material-ui/icons';

import InputSelect from '../../../../components/InputSelect';
import InputText from '../../../../components/InputText';
import InputMask from '../../../../components/InputMask';
import InputFile from '../../../../components/InputFile';

import { useAuth } from '../../../../hooks/auth';

const ugsTypes = [{ value: 'EMPRESA_PUBLICA', label: 'Empresa Pública' }];

const Create: React.FC = () => {
  const { user } = useAuth();
  const ugsAvaiables = user.ugs.map((ug) => ({
    value: ug.id,
    label: `${ug.code} - ${ug.name}`,
  }));

  return (
    <Box paddingX={4} paddingY={4}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h4" color="textPrimary">
            Registros de UG
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Enviar um novo registro para análise.
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Box marginLeft={2}>
            <IconButton>
              <ArrowBack fontSize="large" color="primary" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box marginY={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <InputSelect required label="Tipo de Unidade" options={ugsTypes} />
          </Grid>
          <Grid item xs={12} md={8}>
            <InputSelect
              required
              label="Unidade Gestora"
              options={ugsAvaiables}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <InputText required label="Código" />
          </Grid>

          <Grid item xs={12} md={2}>
            <InputText label="Sigla" />
          </Grid>

          <Grid item xs={12} md={8}>
            <InputText required label="Nome" />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputMask required label="CNPJ" mask="99.999.999/9999-99" />
          </Grid>

          <Grid item xs={12} md={8}>
            <InputText required label="Nome Fantasia" />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText required label="Data de Abertura" />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText required label="Código de Natureza Jurídica" />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText label="Site" />
          </Grid>

          <Grid item xs={12} md={8}>
            <InputText required label="Endereço" />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText required label="Nº" />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText label="Complemento" />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText required label="Bairro" />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText label="CEP" />
          </Grid>

          <Grid item xs={12} md={12}>
            <InputText multiline rows={4} label="Observação" />
          </Grid>

          <Grid item xs={12} md={12}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="body1">
                  Documentos da Unidade Gestora
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Adicione documentos que comprovem a criação da unidade. (Lei
                  de criação, Decretos, etc.)
                </Typography>
              </Box>
            </Box>

            <List style={{ margin: 0, padding: 0 }}>
              <ListSubheader style={{ padding: 0 }}>
                <input
                  id="input-file"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(file) => console.log(file)}
                />
                <label htmlFor="input-file">
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<CloudUpload />}
                    component="span"
                  >
                    ADICIONAR ARQUIVO
                  </Button>
                </label>
              </ListSubheader>

              <ListItem style={{ paddingLeft: 0 }}>
                <ListItemAvatar>
                  <Avatar>
                    <Description />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText color="primary" primary="Decreto.pdf" />
                <ListItemSecondaryAction>
                  <IconButton>
                    <GetApp color="primary" />
                  </IconButton>
                  <IconButton>
                    <Delete color="error" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <Box marginY={2}>
        <Typography variant="h6">Ordenador de Despesa</Typography>

        <Box marginTop={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <InputMask required label="CPF" mask="999.999.999-99" />
            </Grid>

            <Grid item xs={12} md={4}>
              <InputText required label="Nome" />
            </Grid>

            <Grid item xs={12} md={4}>
              <InputText required label="Email" />
            </Grid>

            <Grid item xs={12} md={12}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body1">
                    Documentos da Ordenador
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Adicione documentos que comprovem a criação da unidade. (Lei
                    de criação, Decretos, etc.)
                  </Typography>
                </Box>
              </Box>

              <List style={{ margin: 0, padding: 0 }}>
                <ListSubheader style={{ padding: 0 }}>
                  <input
                    id="input-file"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(file) => console.log(file)}
                  />
                  <label htmlFor="input-file">
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<CloudUpload />}
                      component="span"
                    >
                      ADICIONAR ARQUIVO
                    </Button>
                  </label>
                </ListSubheader>

                <ListItem style={{ paddingLeft: 0 }}>
                  <ListItemAvatar>
                    <Avatar>
                      <Description />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText color="primary" primary="Decreto.pdf" />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <GetApp color="primary" />
                    </IconButton>
                    <IconButton>
                      <Delete color="error" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Create;
