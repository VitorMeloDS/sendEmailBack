import { Request, Response } from 'express';
import { EmailTransport } from '../../providers/config.email';
import { SendMailOptions, Transporter } from 'nodemailer';

export class EmailController {
  private static readonly emailTransport: EmailTransport = new EmailTransport();
  private static readonly sender: any = process.env.SMTP_USER;

  public static async send(req: Request, res: Response) {
    const post = req.body;

    try {
      let transport: Transporter<SendMailOptions>;
      transport = this.emailTransport.transport;
      if (!post?.email) throw { message: 'E-mail não informado!', status: 400 };
      if (!post?.content)
        throw { message: 'Conteúdo do e-mail não informado!', status: 400 };

      const info = await transport.sendMail({
        from: `Code Byte <${this.sender}>`,
        to: post?.email,
        subject: 'Bem-vindas!',
        text: 'E-amil examplo de bem-vindas!',
        html: this.createBody(post.body)
      });

      return res.send(info).status(200);
    } catch (error) {
      return res.send(error.message).status(error.status ?? 500);
    }
  }

  private static createBody(body: string): string {
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
          }

          .btn {
              display: inline-block;
              background-color: #007bff;
              color: #fff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
              margin-top: 20px;
          }

          .btn:hover {
              background-color: #0056b3;
          }
      </style>
      </head>
      <body>
      <div class="container">
          <h1>Bem-vindo(a)!</h1>
          <p>Olá, este E-mail é apenas um teste!</p>
          <p>Seja bem-vindo(a) à nossa comunidade! Estamos felizes em tê-lo conosco.</p>
          <p>Esperamos que você aproveite ao máximo a sua experiência.</p>
          <p>Se tiver alguma dúvida ou precisar de assistência, não hesite em nos contatar.</p>
          <a href="#" class="btn">Começar</a>

          <h2>Conteudo Personalizado</h2>
          <p>${body}</p>
      </div>
      </body>
    `;
  }
}
