import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import 'dotenv/config';

export class EmailTransport {
  private readonly _host: any = process.env.SMTP_HOST;
  private readonly _port: any = process.env.SMTP_PORT;
  private readonly _user: any = process.env.SMTP_USER;
  private readonly _password: any = process.env.SMTP_PASSWORD;

  public get transport(): Transporter<SendMailOptions> {
    return nodemailer.createTransport({
      host: this._host,
      port: this._port,
      secure: false,
      auth: {
        user: this._user,
        pass: this._password
      }
    });
  }
}
