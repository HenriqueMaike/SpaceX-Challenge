import { Response, Request } from "express";
import { ListarLaunchesrService } from "../services/ListarLaunchesrService";

class ListarLaunchesController {
  async handle(req: Request, res: Response) {

    //variavel que recebe meus dados por query
    const { page, search, limit } = req.query;

    //instancia da minha class ListarLaunchesServices
    const listarLaunchesService = new ListarLaunchesrService();

    // Variavel que recebe os dados enviados pelo usuario ou um valor fixo de 5 itens por pagina
    const itemsPerPage = limit ? parseInt(limit as string) : 5;
    //Variavel que recebe a pagina passada pelo params ou um valor fixo de 1 para começar da primeira pagina
    const currentPage = page ? parseInt(page as string) : 1;

    //Variavel que recebe todas as informações do meu service depois de tratadas
    const launchesData = await listarLaunchesService.execute(currentPage, itemsPerPage, search as string);

    // variavel se recebe a quantidade de paginas existente usando o Math.ceil para obter um valor inteiro
    const totalPages = Math.ceil(launchesData.totalDocs / itemsPerPage);

    // resposta enviado ao usuario da requisição
    const response = {
      results: launchesData.results, //dados do banco
      //informações de paginação
      totalDocs: launchesData.totalDocs,
      page: currentPage,
      totalPages: totalPages,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    };

    //responsta
    return res.json(response);
  }
}

export { ListarLaunchesController };
