import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import PageUserService from '@modules/users/services/PageUserService';

interface IndexRequestQuery {
  page?: number;
  filter?: string;
}

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, filter = '' } = request.query as IndexRequestQuery;

    const pageUserService = container.resolve(PageUserService);

    const usersPage = await pageUserService.execute({
      page,
      filter,
    });

    const data = usersPage.data.map(user => classToClass(user));
    usersPage.data = data;

    return response.json(usersPage);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf, name, nickname, email, type, ugs } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      cpf,
      name,
      nickname,
      email,
      type,
      ugs,
    });

    return response.status(201).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { cpf, name, nickname, email, type, blocked, ugs } = request.body;
    const { id } = request.params;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      user_id: Number(id),
      cpf,
      name,
      nickname,
      email,
      type,
      blocked,
      ugs,
    });

    return response.json(user);
  }
}
