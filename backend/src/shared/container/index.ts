import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUgsRepository from '@modules/ugs/repositories/IUgsRepository';
import UgsRepository from '@modules/ugs/infra/typeorm/repositories/UgsRepository';

import IUgsRegistrationsRepository from '@modules/ugs/repositories/IUgsRegistrationsRepository';
import UgsRegistrationsRepository from '@modules/ugs/infra/typeorm/repositories/UgsRegistrationsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';
import UsersTokenRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

container.registerSingleton<IUgsRepository>('UgsRepository', UgsRepository);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokenRepository,
);

container.registerSingleton<IUgsRegistrationsRepository>(
  'UgsRegistrationsRepository',
  UgsRegistrationsRepository,
);
