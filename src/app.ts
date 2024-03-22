// Importação do roteador e dependências necessárias
import { routerControl } from './router/router';
import express, { Express } from 'express';
import 'dotenv/config'; // Carrega variáveis de ambiente do arquivo .env
import cors from 'cors'; // Middleware para lidar com políticas de CORS

// Definição da classe AppListener
export class AppListenner {
  // Declaração de propriedades estáticas: app (instância Express) e port (número da porta do servidor)
  private static readonly app: Express = express();
  private static readonly port: any = process.env.APP_PORT;

  // Método privado para configurar as respostas do servidor (urlencoded e JSON)
  private static configResponse(): void {
    AppListenner.app.use(express.urlencoded({ extended: false }));
    AppListenner.app.use(express.json());
  }

  // Método privado para configurar a política de CORS
  private static configCors(): void {
    AppListenner.app.use(cors());
  }

  // Método privado para configurar as rotas principais da aplicação
  private static router(): void {
    AppListenner.app.use('/api', routerControl);
  }

  // Método público para iniciar o servidor Express
  public static async listen(): Promise<void> {
    try {
      // Configurações iniciais do servidor
      AppListenner.configResponse();
      AppListenner.configCors();
      AppListenner.router();

      // Inicia o servidor Express na porta especificada
      AppListenner.app.listen(AppListenner.port, (): void => {
        console.log(`Server started in port ${AppListenner.port}`);
      });
    } catch (error) {
      // Tratamento de exceção em caso de erro na inicialização do servidor
      throw new Error(AppListenner.name + ' ' + error);
    }
  }
}
