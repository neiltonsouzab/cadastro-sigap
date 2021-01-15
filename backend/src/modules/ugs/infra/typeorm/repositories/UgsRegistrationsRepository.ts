import { getRepository, Repository } from 'typeorm';

import IUgsRegistrationsRepository from '@modules/ugs/repositories/IUgsRegistrationsRepository';
import ICreateUgRegistrationDTO from '@modules/ugs/dtos/ICreateUgRegistrationDTO';
import UgRegistration from '../entities/UgRegistration';

class UgsRegistrationsRepository implements IUgsRegistrationsRepository {
  private ormRepository: Repository<UgRegistration>;

  constructor() {
    this.ormRepository = getRepository(UgRegistration);
  }

  public async findById(id: number): Promise<UgRegistration | undefined> {
    const ugRegistration = await this.ormRepository.findOne(id);

    return ugRegistration;
  }

  public async findByUgAndStatus(
    ug_id: number,
    status: string,
  ): Promise<UgRegistration | undefined> {
    const ugRegistration = await this.ormRepository.findOne({
      where: {
        ug_id,
        status,
      },
    });

    return ugRegistration;
  }

  public async findByUg(ug_id: number): Promise<UgRegistration[]> {
    const ugsRegistrations = await this.ormRepository.find({
      where: {
        ug_id,
      },
    });

    return ugsRegistrations;
  }

  public async create({
    cnpj,
    name,
    fantasy_name,
    address,
    number,
    district,
    cep,
    complement,
    email,
    phone,
    site,
    short_name,
    open_date,
    legal_nature_code,
    obs,
    type,
    expense_ordinator_cpf,
    expense_ordinator_name,
    expense_ordinator_email,
    user_id,
    ug_id,
    files,
  }: ICreateUgRegistrationDTO): Promise<UgRegistration> {
    const ugRegistration = this.ormRepository.create({
      cnpj,
      name,
      fantasy_name,
      address,
      number,
      district,
      cep,
      complement,
      email,
      phone,
      site,
      short_name,
      open_date,
      legal_nature_code,
      obs,
      type,
      expense_ordinator_cpf,
      expense_ordinator_name,
      expense_ordinator_email,
      user_id,
      ug_id,
      files,
    });

    await this.ormRepository.save(ugRegistration);

    return ugRegistration;
  }

  public async save(ugRegistration: UgRegistration): Promise<UgRegistration> {
    return this.ormRepository.save(ugRegistration);
  }
}

export default UgsRegistrationsRepository;
