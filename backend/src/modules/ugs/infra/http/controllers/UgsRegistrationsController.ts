import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUgRegistrationService from '@modules/ugs/services/CreateUgRegistrationService';
import ListUgRegistrationService from '@modules/ugs/services/ListUgRegistrationService';

export default class UgsRegistrationsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { ug_id } = request.query;

    const listUgRegistrationService = container.resolve(
      ListUgRegistrationService,
    );

    const ugsRegistrations = await listUgRegistrationService.execute({
      ug_id: Number(ug_id),
      user: request.user,
    });

    return response.json(ugsRegistrations);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
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
      expense_ordinator_email,
      expense_ordinator_name,
      ug_id,
    } = request.body;

    const requestFiles = request.files as Express.Multer.File[];

    const files = requestFiles.map(file => ({
      name: file.filename,
      original_name: file.originalname,
      content_type: file.mimetype,
      size: file.size,
      type: file.type || 'ordinator',
    }));

    const createUgRegistrationService = container.resolve(
      CreateUgRegistrationService,
    );

    const ugRegistration = await createUgRegistrationService.execute({
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
      expense_ordinator_email,
      expense_ordinator_name,
      ug_id,
      user: request.user,
      files,
    });

    return response.status(201).json(ugRegistration);
  }
}
