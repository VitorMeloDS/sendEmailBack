import { EmailTransport } from '../../providers/config.email'; // Importa a classe EmailTransport
import { SendMailOptions, Transporter } from 'nodemailer';
import { Request, Response } from 'express';

export class EmailController {
  // Instância da classe EmailTransport para configurar o transporte de e-mails
  private static readonly emailTransport: EmailTransport = new EmailTransport();
  // Obtém o remetente do ambiente
  private static readonly sender: any = process.env.SMTP_USER;

  /**
   *
   * @param {Request} req - Request object.
   * @param {Response} res - Response object.
   * @returns
   */
  public static async send(req: Request, res: Response) {
    const post = req.body; // Obtém os dados enviados na requisição

    try {
      let transport: Transporter<SendMailOptions>;
      // Obtém o transporte de e-mail da instância EmailTransport
      transport = EmailController.emailTransport.transport;

      // Verifica se o e-mail e o conteúdo foram fornecidos
      if (!post?.email) throw { message: 'E-mail não informado!', status: 400 };
      if (!post?.content)
        throw { message: 'Conteúdo do e-mail não informado!', status: 400 };

      // Envia o e-mail
      const info = await transport.sendMail({
        from: `Code Byte <${EmailController.sender}>`, // Remetente do E-mail
        to: post?.email, // destinatário do E-mail
        subject: 'Bem-vindas!', // Assunto do e-mail
        text: 'E-email examplo de bem-vindas!', // Corpo do e-mail em texto plano
        html: EmailController.createBody(post.content) // Corpo do e-mail em HTML
      });

      // Retorna a resposta com as informações do e-mail enviado
      return res.send({ message: info.envelope }).status(200);
    } catch (error) {
      // Em caso de erro, retorna uma mensagem de erro com o status correspondente
      console.log(error);
      return res.send({ message: error.message }).status(error.status ?? 500);
    }
  }

  /**
   *
   * @param {string} body - Content that will be rendered in HTML.
   * @returns
   */
  private static createBody(body: string): string {
    // Template HTML para o corpo do e-mail
    return `<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email de Boas-vindas</title>
      <style>
          /* Reset de estilos */
          body, h1, p {
              margin: 0;
              padding: 0;
          }

          /* Estilos personalizados */
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
          }

          .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          h1 {
              color: #333;
              text-align: center;
              margin-bottom: 20px;
          }

          p {
              color: #666;
              font-size: 16px;
              line-height: 1.5;
              text-align: center;
          }

          span {
            color: #666;
            font-size: 16px;
            line-height: 1.5;
            text-align: center;
          }

          h2 {
            margin-top: 20px;
          }

          .custom {
            text-align: center;
          }

      </style>
      </head>
      <body>
      <div class="container">
          <h1>Bem-vindo(a)!</h1>
          <p>Olá, este E-mail é apenas um teste!</p>

          <h2 class="custom">Conteudo Personalizado</h2>
          <p class="custom">${body}</p>
      </div>
      </body>
    `;
  }
}
