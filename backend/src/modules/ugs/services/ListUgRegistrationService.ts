import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import UgRegistration from '../infra/typeorm/entities/UgRegistration';
import IUgsRegistrationsRepository from '../repositories/IUgsRegistrationsRepository';

interface IRequest {
  ug_id: number;
  user: User;
}

@injectable()
class ListUgRegistrationService {
  constructor(
    @inject('UgsRegistrationsRepository')
    private ugsRegistrationsService: IUgsRegistrationsRepository,
  ) {}

  public async execute({ ug_id, user }: IRequest): Promise<UgRegistration[]> {
    const userAuthorizedUg = user.ugs.find(ug => ug.id === ug_id);

    if (!userAuthorizedUg) {
      throw new AppError('Usuário sem autorização para esta UG.');
    }

    const ugsRegistrations = await this.ugsRegistrationsService.findByUg(ug_id);

    return ugsRegistrations;
  }
}

export default ListUgRegistrationService;
