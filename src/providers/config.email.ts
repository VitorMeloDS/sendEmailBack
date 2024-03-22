// Importação do Nodemailer para envio de e-mails e das interfaces necessárias
import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import 'dotenv/config'; // Carrega variáveis de ambiente do arquivo .env

// Classe responsável por configurar o transporte de e-mails
export class EmailTransport {
  // Propriedades privadas para armazenar as credenciais SMTP
  private readonly _password: any = process.env.SMTP_PASSWORD;
  private readonly _host: any = process.env.SMTP_HOST;
  private readonly _port: any = process.env.SMTP_PORT;
  private readonly _user: any = process.env.SMTP_USER;

  // Getter para obter o transporte de e-mails configurado
  public get transport(): Transporter<SendMailOptions> {
    // Cria um transporte de e-mails com base nas credenciais SMTP
    return nodemailer.createTransport({
      host: this._host,
      port: this._port,
      secure: true, // Habilita o uso de conexões seguras (SSL/TLS)
      auth: {
        user: this._user,
        pass: this._password
      }
    });
  }
}
