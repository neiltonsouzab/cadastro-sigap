import { inject, injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';

import mailConfig from '@config/mail';

import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class SefinMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      host: '000',
      port: 11,
    });
  }

  public async sendMail({
    to,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { from } = mailConfig.defaults;

    await this.client.sendMail({
      from,
      to,
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
