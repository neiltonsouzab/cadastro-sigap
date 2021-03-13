import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Tooltip,
  makeStyles,
  createStyles,
  Theme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import {
  ArrowBack,
  Description,
  GetApp,
  CheckCircle,
  Cancel,
} from '@material-ui/icons';
import { format, parseISO } from 'date-fns';

import InputText from '../../../../components/InputText';

import api from '../../../../services/api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconSuccess: {
      color: theme.palette.success.main,
    },
    iconDanger: {
      color: theme.palette.error.main,
    },
  }),
);

interface RouteParams {
  id: number;
}

interface File {
  id: number;
  name: string;
  original_name: string;
  content_type: string;
  size: number;
  from: string;
  url: string;
}

interface UgRegistration {
  id: string;
  type: string;
  code: string;
  short_name: string;
  name: string;
  cnpj: string;
  fantasy_name: string;
  open_date: string;
  legal_nature_code: string;
  address: string;
  number: string;
  complement: string;
  district: string;
  cep: string;
  email: string;
  phone: string;
  site: string;
  obs: string;
  expense_ordinator_cpf: string;
  expense_ordinator_name: string;
  expense_ordinator_email: string;
  ug: {
    id: number;
    code: string;
    short_name: string;
    name: string;
  };
  files: File[];
}

const Show: React.FC = () => {
  const styles = useStyles();

  const params = useParams();
  const { id } = params as RouteParams;

  const [ugRegistration, setUgRegistration] = useState<UgRegistration>();
  const [ugFiles, setUgFiles] = useState<File[]>([]);
  const [ordinatorFiles, setOrdinatorFiles] = useState<File[]>([]);

  const [openApprovalDialog, setOpenApprovalDialog] = useState(false);
  const [openRefusalDialog, setOpenRefusalDialog] = useState(false);

  useEffect(() => {
    const loadUgRegistration = async (): Promise<void> => {
      const { data } = await api.get<UgRegistration>(
        `/ugs-registrations/${id}`,
      );

      setUgFiles(data.files.filter((file) => file.from === 'ug'));
      setOrdinatorFiles(data.files.filter((file) => file.from === 'ordinator'));

      setUgRegistration({
        ...data,
        open_date: format(parseISO(data.open_date), 'dd/MM/yyyy'),
      });
    };

    loadUgRegistration();
  }, [id]);

  const handleAprroval = useCallback(() => {
    console.log('Aprovado!');
  }, []);

  const handleRefusal = useCallback(() => {
    console.log('Reprovado!');
  }, []);

  if (!ugRegistration) {
    return <></>;
  }

  return (
    <Box paddingX={4} paddingY={4}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h4" color="textPrimary">
            Registros de UG
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Visualização de registro enviado.
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Tooltip title="Aprovar">
            <IconButton onClick={() => setOpenApprovalDialog(true)}>
              <CheckCircle fontSize="large" className={styles.iconSuccess} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Recusar">
            <IconButton onClick={() => setOpenRefusalDialog(true)}>
              <Cancel fontSize="large" className={styles.iconDanger} />
            </IconButton>
          </Tooltip>

          <IconButton>
            <ArrowBack fontSize="large" color="primary" />
          </IconButton>
        </Box>
      </Box>

      <Box marginY={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Tipo de Unidade"
              defaultValue="Empresa Pública"
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Unidade Gestora"
              defaultValue={`${ugRegistration.ug.code} - ${ugRegistration.ug.name}`}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Código"
              defaultValue={ugRegistration.code}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Sigla"
              defaultValue={ugRegistration.short_name}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Nome"
              defaultValue={ugRegistration.name}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="CNPJ"
              defaultValue={ugRegistration.cnpj}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Nome Fantasia"
              defaultValue={ugRegistration.fantasy_name}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Data de Abertura"
              defaultValue={ugRegistration.open_date}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Código de Natureza Jurídica"
              defaultValue={ugRegistration.legal_nature_code}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Endereço"
              defaultValue={ugRegistration.address}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Nº"
              defaultValue={ugRegistration.number}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Complemento"
              defaultValue={ugRegistration.complement}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Bairro"
              defaultValue={ugRegistration.district}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="CEP"
              defaultValue={ugRegistration.cep}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Email"
              defaultValue={ugRegistration.email}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Telefone"
              defaultValue={ugRegistration.phone}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              label="Site"
              defaultValue={ugRegistration.site}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <InputText
              InputProps={{
                readOnly: true,
              }}
              multiline
              rows={4}
              label="Observação"
              defaultValue={ugRegistration.obs}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Typography variant="body1">
              Documentos da Unidade Gestora
            </Typography>

            <List style={{ margin: 0, padding: 0 }}>
              {ugFiles.map((ugFile) => (
                <ListItem key={ugFile.id} style={{ paddingLeft: 0 }}>
                  <ListItemAvatar>
                    <Avatar>
                      <Description />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    color="primary"
                    primary={ugFile.original_name}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      rel="noreferrer"
                      target="_blank"
                      href={ugFile.url}
                    >
                      <GetApp color="primary" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <Box marginY={4}>
        <Typography variant="h6">Ordenador de Despesa</Typography>

        <Box marginTop={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <InputText
                InputProps={{
                  readOnly: true,
                }}
                label="CPF"
                defaultValue={ugRegistration.expense_ordinator_cpf}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <InputText
                InputProps={{
                  readOnly: true,
                }}
                label="Nome"
                defaultValue={ugRegistration.expense_ordinator_name}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <InputText
                InputProps={{
                  readOnly: true,
                }}
                label="Email"
                defaultValue={ugRegistration.expense_ordinator_email}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography variant="body1">Documentos do Ordenador</Typography>

              <List style={{ margin: 0, padding: 0 }}>
                {ordinatorFiles.map((ordinatorFile) => (
                  <ListItem key={ordinatorFile.id} style={{ paddingLeft: 0 }}>
                    <ListItemAvatar>
                      <Avatar>
                        <Description />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      color="primary"
                      primary={ordinatorFile.original_name}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        rel="noreferrer"
                        target="_blank"
                        href={ordinatorFile.url}
                      >
                        <GetApp color="primary" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Dialog
        open={openApprovalDialog}
        onClose={() => setOpenApprovalDialog(false)}
      >
        <DialogTitle>Registro de UG - Aprovar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você tem certeza que deseja aprovar o registro enviado pela ug? Esta
            operação não poderá ser desfeita.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenApprovalDialog(false)} color="primary">
            CANCELAR
          </Button>
          <Button onClick={handleAprroval} color="primary" autoFocus>
            SIM
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openRefusalDialog}
        onClose={() => setOpenRefusalDialog(false)}
      >
        <DialogTitle>Registro de UG - Recusar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você tem certeza que deseja recusar o registro enviado pela ug? Esta
            operação não poderá ser desfeita.
          </DialogContentText>

          <InputText multiline rows={4} label="Observação" />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenRefusalDialog(false)} color="primary">
            CANCELAR
          </Button>
          <Button onClick={handleAprroval} color="primary" autoFocus>
            SIM
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Show;
