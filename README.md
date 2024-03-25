# API de Envio de Email

Esta é uma API em Node.js para enviar emails utilizando um servidor SMTP configurável. Foi desenvolvida com o intuito de exemplificar o envio de emails através de uma rota simples.

## Como Usar

Siga os passos abaixo para clonar o repositório, instalar as dependências e executar a API.

1. Clone o repositório:

    ```bash
    git clone https://github.com/VitorMeloDS/sendEmailBack.git
    ```

2. Navegue até o diretório criado:

    ```bash
    cd sendEmailBack
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Execute a API:

    ```bash
    npm run dev
    ```

Obs: para executar a API é preciso ter as variáveis de ambiente configuradas.

## Endpoint

A API possui uma única rota:

- `POST /api/send`: Esta rota é responsável por enviar o email. O corpo da solicitação deve conter as seguintes propriedades:

    ```json
    {
      "email": "destinatario@example.com",
      "content": "conteudo do email"
    }
    ```

## Variáveis de Ambiente

As variáveis de ambiente podem ser configuradas no arquivo `.env`. As seguintes variáveis estão disponíveis:

- `APP_PORT`: Porta na qual a API será executada. O padrão é `3030`.
- `SMTP_HOST`: IP ou hostname do servidor SMTP. Para o servidor do Google, utilize `smtp.gmail.com`.
- `SMTP_PORT`: Porta do servidor SMTP. Para o servidor do Google, utilize `587`.
- `SMTP_USER`: Usuário do servidor SMTP (geralmente um endereço de email).
- `SMTP_PASSWORD`: Senha do usuário do servidor SMTP.

## Configuração do Servidor SMTP

Para a configuração do servidor SMTP, você pode utilizar o servidor gratuito do Google ou qualquer outro servidor SMTP disponível. Certifique-se de que as variáveis de ambiente `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` e `SMTP_PASSWORD` estão corretamente configuradas para o servidor SMTP desejado.

Para o servidor do Google, você precisará ativar o acesso de aplicativos menos seguros em sua conta Google ou configurar a autenticação de dois fatores e gerar uma senha de aplicativo para usar como `SMTP_PASSWORD`.

## Aplicação Web

Além da API, há uma aplicação web disponível para facilitar o uso da API com o frontend. Você pode encontrar o repositório da aplicação web em [sendEmail](https://github.com/VitorMeloDS/sendEmail.git).

---

Este projeto é exemplo básico para quem deseja integrar facilmente o envio de emails em suas aplicações. Sinta-se à vontade para contribuir, reportar problemas ou sugerir melhorias.
