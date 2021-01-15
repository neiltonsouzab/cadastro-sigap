import { getRepository, Like, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPaginator from '@shared/models/IPaginator';
import IPage from '@shared/models/IPage';
import IFilterUserDTO from '@modules/users/dtos/IFilterUserDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async find({
    page,
    filters,
  }: IPaginator<IFilterUserDTO>): Promise<IPage<User>> {
    const perPage = 10;
    const current = Number(page);

    const skip = page * perPage - perPage;
    const take = perPage;

    const query = this.ormRepository.createQueryBuilder();

    const { name, cpf } = filters;

    if (name) {
      console.log(name);
      query.where({
        name: Like(`%${name}%`),
      });
    }

    if (cpf) {
      query.where({
        cpf: Like(`%${cpf}%`),
      });
    }

    const pages = Math.ceil((await query.getCount()) / perPage);

    query.take(take);
    query.skip(skip);

    const data = await query.getMany();

    return {
      current,
      pages,
      data,
    };
  }

  public async findById(id: number): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { cpf },
      relations: ['ugs'],
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create({
    cpf,
    name,
    nickname,
    email,
    type,
    ugs,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      cpf,
      name,
      nickname,
      email,
      type,
      ugs,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
