import IPage from '@shared/models/IPage';
import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  page: number;
  filters: {
    name?: string;
    cpf?: string;
  };
}

@injectable()
class PageUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ page, filters }: IRequest): Promise<IPage<User>> {
    const usersPage = await this.usersRepository.find({
      page,
      filters,
    });

    return usersPage;
  }
}

export default PageUserService;
