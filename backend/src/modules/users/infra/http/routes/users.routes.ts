import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureAuthorized from '@modules/users/infra/http/middlewares/ensureAuthorized';

import UsersController from '../controllers/UsersController';

const usersRoutes = Router();
const usersController = new UsersController();

const usersValidation = celebrate({
  [Segments.BODY]: {
    cpf: Joi.string().required(),
    name: Joi.string().required(),
    nickname: Joi.string().required(),
    email: Joi.string().email().required(),
    type: Joi.string().required(),
    ugs: Joi.array().items(
      Joi.object({
        id: Joi.number().required(),
      }),
    ),
  },
});

usersRoutes.get(
  '/',
  ensureAuthenticated,
  ensureAuthorized(['ADMINISTRATOR']),
  usersController.index,
);

usersRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAuthorized(['ADMINISTRATOR']),
  usersValidation,
  usersController.create,
);
usersRoutes.put(
  '/:id',
  ensureAuthenticated,
  ensureAuthorized(['ADMINISTRATOR']),
  usersValidation,
  usersController.update,
);

export default usersRoutes;
