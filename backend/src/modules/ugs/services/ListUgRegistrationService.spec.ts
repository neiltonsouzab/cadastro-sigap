import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeUgsRegistrationsRepository from '../repositories/fakes/FakeUgsRegistrationsRepository';
import ListUgRegistrationService from './ListUgRegistrationService';

let fakeUgsRegistrationsRepository: FakeUgsRegistrationsRepository;
let fakeUsersRepository: FakeUsersRepository;
let listUgRegistrationService: ListUgRegistrationService;

describe('ListUgRegistration', () => {
  beforeEach(() => {
    fakeUgsRegistrationsRepository = new FakeUgsRegistrationsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    listUgRegistrationService = new ListUgRegistrationService(
      fakeUgsRegistrationsRepository,
    );
  });

  it('should be able list ug registrations', async () => {
    const user = await fakeUsersRepository.create({
      cpf: '111.111.111-11',
      name: 'John Doe',
      nickname: 'John',
      email: 'johndoe@example.com',
      type: 'CONTADOR',
      ugs: [
        {
          id: 1,
        },
      ],
    });

    const ugRegistration = await fakeUgsRegistrationsRepository.create({
      cnpj: '11.111.111/1111-11',
      name: 'Name',
      fantasy_name: 'FantasyName',
      address: 'Address',
      number: 'Number',
      district: 'District',
      cep: 'Cep',
      complement: 'Complement',
      email: 'Email',
      phone: 'Phone',
      site: 'Site',
      short_name: 'ShortName',
      open_date: new Date(),
      legal_nature_code: 'LegalNatureCode',
      obs: 'Obs',
      type: 'Type',
      expense_ordinator_cpf: '111.111.111-11',
      expense_ordinator_name: 'OrdinatorName',
      expense_ordinator_email: 'OrdinatorEmail',
      user_id: user.id,
      ug_id: 1,
      files: [
        {
          name: 'file-name',
          original_name: 'original-name',
          content_type: 'content-type',
          size: 10,
          type: 'type',
        },
      ],
    });

    const ugsRegistrations = await listUgRegistrationService.execute({
      ug_id: 1,
      user,
    });

    expect(ugsRegistrations).toHaveLength(1);
    expect(ugsRegistrations).toEqual([ugRegistration]);
  });

  it('should not be able list ug registration in ug not authorized for user', async () => {
    const user = await fakeUsersRepository.create({
      cpf: '111.111.111-11',
      name: 'John Doe',
      nickname: 'John',
      email: 'johndoe@example.com',
      type: 'CONTADOR',
      ugs: [
        {
          id: 1,
        },
      ],
    });

    await expect(
      listUgRegistrationService.execute({
        ug_id: 2,
        user,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
