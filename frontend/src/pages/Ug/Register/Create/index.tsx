import React, { useCallback, useState } from 'react';
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
  CircularProgress,
} from '@material-ui/core';
import {
  ArrowBack,
  Description,
  Delete,
  CloudUpload,
  GetApp,
  Send,
} from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import InputSelect from '../../../../components/InputSelect';
import InputText from '../../../../components/InputText';
import InputMask from '../../../../components/InputMask';

import { useAuth } from '../../../../hooks/auth';

const ugsTypes = [{ value: 'EMPRESA_PUBLICA', label: 'Empresa Pública' }];

interface MyFile extends File {
  uuid: string;
  from: string;
}

const validationSchema = Yup.object({
  type: Yup.string().required('Tipo obrigatório.'),
  ug_id: Yup.number().required('UG obrigatória.'),
  code: Yup.string().required('Código obrigatório.'),
  short_name: Yup.string().required('SIGLA obrigatória.'),
  name: Yup.string().required('Nome obrigatório.'),
  cnpj: Yup.string().required('CNPJ obrigatório.'),
  fantasy_name: Yup.string().required('Nome fantasia obrigatório.'),
  open_date: Yup.string().required('Data de abertura obrigatório.'),
  legal_nature_code: Yup.string().required(
    'Código de natureza jurídica obrigatório.',
  ),
  address: Yup.string().required('Endereço obrigatório.'),
  number: Yup.string().required('Nº obrigatório.'),
  district: Yup.string().required('Bairro obrigatório.'),
  cep: Yup.string().required('CEP obrigatório.'),
  email: Yup.string().email('Email inválido.').required('Email obrigatório.'),
  phone: Yup.string().required('Telefone obrigatório'),
  expense_ordinator_cpf: Yup.string().required('CPF do ordenador obrigatório.'),
  expense_ordinator_name: Yup.string().required(
    'Nome do ordenador obrigatório.',
  ),
  expense_ordinator_email: Yup.string()
    .email('Email inválido.')
    .required('Email do ordenador obrigatório.'),
});

const Create: React.FC = () => {
  const { user } = useAuth();

  const ugsAvaiables = user.ugs.map((ug) => ({
    value: ug.id,
    label: `${ug.code} - ${ug.name}`,
  }));

  const [ugFiles, setUgFiles] = useState<MyFile[]>([]);
  const [ordinatorFiles, setOrdinatorFiles] = useState<MyFile[]>([]);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      type: '',
      ug_id: undefined,
      code: '',
      short_name: '',
      name: '',
      cnpj: '',
      fantasy_name: '',
      open_date: '',
      legal_nature_code: '',
      address: '',
      number: '',
      complement: '',
      district: '',
      cep: '',
      email: '',
      phone: '',
      site: '',
      obs: '',
      expense_ordinator_cpf: '',
      expense_ordinator_name: '',
      expense_ordinator_email: '',
    },
    onSubmit: (data) => {
      const formData = new FormData();
      formData.append('type', data.type);
      formData.append('ug_id', String(data.ug_id));
      formData.append('code', String(data.code));
      formData.append('short_name', data.short_name);
      formData.append('name', data.name);
      formData.append('cnpj', data.cnpj);
      formData.append('fantasy_name', data.fantasy_name);
      formData.append('open_date', data.open_date);
      formData.append('legal_nature_code', data.legal_nature_code);
      formData.append('address', data.address);
      formData.append('number', data.number);
      formData.append('complement', data.complement);
      formData.append('district', data.district);
      formData.append('cep', data.cep);
      formData.append('email', data.email);
      formData.append('site', data.site);
      formData.append('expense_ordinator_cpf', data.expense_ordinator_cpf);
      formData.append('expense_ordinator_name', data.expense_ordinator_name);
      formData.append('expense_ordinator_email', data.expense_ordinator_email);

      const files = [...ugFiles, ...ordinatorFiles];
      files.map((file) => formData.append('files', file));
    },
  });

  const handleAddUgFile = useCallback((files: FileList | null) => {
    if (files) {
      const file = files[0] as MyFile;
      file.uuid = uuidv4();
      file.from = 'ug';

      setUgFiles((state) => [...state, file]);
    }
  }, []);

  const handleAddOrdinatorFile = useCallback((files: FileList | null) => {
    if (files) {
      const file = files[0] as MyFile;
      file.uuid = uuidv4();
      file.from = 'ordinator';

      setOrdinatorFiles((state) => [...state, file]);
    }
  }, []);

  const handleRemoveUgFile = useCallback((uuid: string) => {
    setUgFiles((state) => state.filter((item) => item.uuid !== uuid));
  }, []);

  const handleRemoveOrdinatorFile = useCallback((uuid: string) => {
    setOrdinatorFiles((state) => state.filter((item) => item.uuid !== uuid));
  }, []);

  const onSubmit = useCallback(() => {
    formik.handleSubmit();
  }, [formik]);

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
          <Box>
            <Button
              color="primary"
              variant="contained"
              size="large"
              startIcon={
                formik.isSubmitting ? <CircularProgress size={24} /> : <Send />
              }
              onClick={onSubmit}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'ENVIANDO' : 'ENVIAR'}
            </Button>
          </Box>

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
            <InputSelect
              required
              label="Tipo de Unidade"
              name="type"
              errors={formik.errors.type}
              touched={formik.touched.type}
              options={ugsTypes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <InputSelect
              required
              label="Unidade Gestora"
              name="ug_id"
              errors={formik.errors.ug_id}
              touched={formik.touched.ug_id}
              options={ugsAvaiables}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <InputText
              required
              label="Código"
              name="code"
              errors={formik.errors.code}
              touched={formik.touched.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <InputText
              label="Sigla"
              name="short_name"
              errors={formik.errors.short_name}
              touched={formik.touched.short_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <InputText
              required
              label="Nome"
              name="name"
              errors={formik.errors.name}
              touched={formik.touched.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputMask
              required
              label="CNPJ"
              mask="99.999.999/9999-99"
              name="cnpj"
              errors={formik.errors.cnpj}
              touched={formik.touched.cnpj}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <InputText
              required
              label="Nome Fantasia"
              name="fantasy_name"
              errors={formik.errors.fantasy_name}
              touched={formik.touched.fantasy_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputMask
              required
              mask="99/99/9999"
              label="Data de Abertura"
              name="open_date"
              errors={formik.errors.open_date}
              touched={formik.touched.open_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <InputText
              required
              label="Código de Natureza Jurídica"
              name="legal_nature_code"
              errors={formik.errors.legal_nature_code}
              touched={formik.touched.legal_nature_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <InputText
              required
              label="Endereço"
              name="address"
              errors={formik.errors.address}
              touched={formik.touched.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              required
              label="Nº"
              name="number"
              errors={formik.errors.number}
              touched={formik.touched.number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              label="Complemento"
              name="complement"
              errors={formik.errors.complement}
              touched={formik.touched.complement}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              required
              label="Bairro"
              name="district"
              errors={formik.errors.district}
              touched={formik.touched.district}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputMask
              required
              mask="99999-999"
              label="CEP"
              name="cep"
              errors={formik.errors.cep}
              touched={formik.touched.cep}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              required
              label="Email"
              name="email"
              errors={formik.errors.email}
              touched={formik.touched.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputMask
              required
              mask="(99) 9999-9999"
              label="Telefone"
              name="phone"
              errors={formik.errors.phone}
              touched={formik.touched.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputText
              label="Site"
              name="site"
              errors={formik.errors.site}
              touched={formik.touched.site}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <InputText
              multiline
              rows={4}
              label="Observação"
              name="obs"
              errors={formik.errors.obs}
              touched={formik.touched.obs}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
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
                  id="input-ug-file"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(event) => handleAddUgFile(event.target.files)}
                />
                <label htmlFor="input-ug-file">
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

              {ugFiles.map((ugFile) => (
                <ListItem key={ugFile.uuid} style={{ paddingLeft: 0 }}>
                  <ListItemAvatar>
                    <Avatar>
                      <Description />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText color="primary" primary={ugFile.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      rel="noreferrer"
                      target="_blank"
                      href={URL.createObjectURL(ugFile)}
                    >
                      <GetApp color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleRemoveUgFile(ugFile.uuid)}>
                      <Delete color="error" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
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
              <InputMask
                required
                label="CPF"
                mask="999.999.999-99"
                name="expense_ordinator_cpf"
                errors={formik.errors.expense_ordinator_cpf}
                touched={formik.touched.expense_ordinator_cpf}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <InputText
                required
                label="Nome"
                name="expense_ordinator_name"
                errors={formik.errors.expense_ordinator_name}
                touched={formik.touched.expense_ordinator_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <InputText
                required
                label="Email"
                name="expense_ordinator_email"
                errors={formik.errors.expense_ordinator_email}
                touched={formik.touched.expense_ordinator_email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
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
                    id="input-ordinator-file"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(event) =>
                      handleAddOrdinatorFile(event.target.files)
                    }
                  />
                  <label htmlFor="input-ordinator-file">
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

                {ordinatorFiles.map((ordinatorFile) => (
                  <ListItem key={ordinatorFile.uuid} style={{ paddingLeft: 0 }}>
                    <ListItemAvatar>
                      <Avatar>
                        <Description />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      color="primary"
                      primary={ordinatorFile.name}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        rel="noreferrer"
                        target="_blank"
                        href={URL.createObjectURL(ordinatorFile)}
                      >
                        <GetApp color="primary" />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          handleRemoveOrdinatorFile(ordinatorFile.uuid)
                        }
                      >
                        <Delete color="error" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Create;
