import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUgRegistrationService from '@modules/ugs/services/CreateUgRegistrationService';
import PageUgRegistrationService from '@modules/ugs/services/PageUgRegistrationService';


interface IndexQueryParams {
  page?: number;
  perPage?: number;
  filter?: number[];
}

export default class UgsRegistrationsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, perPage = 10, filter  } = request.query as IndexQueryParams;

    const pageUgRegistrationService = container.resolve(
      PageUgRegistrationService,
    );

    let ugsIdsFilter = filter || request.user.ugs.map(ug => ug.id);
    
    if (typeof(filter) === 'string') {
      ugsIdsFilter = [filter];
    }

    
    const ugsRegistrations = await pageUgRegistrationService.execute({
      page,
      perPage,
      filter: ugsIdsFilter.map(Number),
      user: request.user,
    });

    return response.json(ugsRegistrations);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      code,
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
      from: file.from,
    }));

    const createUgRegistrationService = container.resolve(
      CreateUgRegistrationService,
    );

    const ugRegistration = await createUgRegistrationService.execute({
      code,
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
