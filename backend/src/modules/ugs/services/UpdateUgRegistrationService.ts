import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import UgRegistration from '../infra/typeorm/entities/UgRegistration';
import IUgsRegistrationsRepository from '../repositories/IUgsRegistrationsRepository';

interface IRequest {
  user: User;
  ug_registration_id: number;
  status: string;
  status_justification: string;
}

@injectable()
class UpdateUgRegistrationService {
  constructor(
    @inject('UgsRegistrationsRepository')
    private ugsRegistrationsRepository: IUgsRegistrationsRepository,
  ) {}

  public async execute({
    user,
    ug_registration_id,
    status,
    status_justification,
  }: IRequest): Promise<UgRegistration> {
    const ugRegistration = await this.ugsRegistrationsRepository.findById(
      ug_registration_id,
    );

    if (!ugRegistration) {
      throw new AppError('Registro de UG não encontrado.');
    }

    const userAuthorizedUg = user.ugs.find(
      ug => ug.id === ugRegistration.ug_id,
    );

    if (!userAuthorizedUg) {
      throw new AppError('Usuário não tem autorização para esta UG.');
    }

    ugRegistration.user_update_id = user.id;
    ugRegistration.status = status;
    ugRegistration.status_justification = status_justification;

    await this.ugsRegistrationsRepository.save(ugRegistration);

    return ugRegistration;
  }
}

export default UpdateUgRegistrationService;
