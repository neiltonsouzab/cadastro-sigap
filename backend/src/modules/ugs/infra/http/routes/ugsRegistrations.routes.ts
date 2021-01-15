import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureAuthorized from '@modules/users/infra/http/middlewares/ensureAuthorized';
import UgsRegistrationsController from '../controllers/UgsRegistrationsController';

const ugsRegistrationsRoutes = Router();
const upload = multer(uploadConfig);
const ugsRegistrationsController = new UgsRegistrationsController();

ugsRegistrationsRoutes.get(
  '/',
  ensureAuthenticated,
  ensureAuthorized(['ADMINISTRATOR', 'CONTADOR']),
  ugsRegistrationsController.index,
);

ugsRegistrationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAuthorized(['ADMINISTRATOR', 'CONTADOR']),
  upload.array('files'),
  ugsRegistrationsController.create,
);

export default ugsRegistrationsRoutes;
