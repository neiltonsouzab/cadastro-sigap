import { Router } from 'express';

import UgsController from '../controllers/UgsController';

const ugsRoutes = Router();
const ugsController = new UgsController();

ugsRoutes.get('/', ugsController.index);

export default ugsRoutes;
