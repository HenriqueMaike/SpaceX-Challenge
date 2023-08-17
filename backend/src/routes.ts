import {Router, Request, Response } from 'express';
import { ListarLaunchesController } from './controllers/ListarLaunchesController';
import { ListarLaunchesStatsController } from './controllers/ListarLaunchesStatsController';

const router = Router();

//rotas de usuario

//rota root da API / devolve somente a mensagem avisando que é um desafio
router.get('/', (req: Request, res: Response)=>{
    const message = {message: "Fullstack Challenge 🏅 - Space X API"};
    return res.json(message);
});



// rota da requisição launches que retorna todos os dados da api por paginas, sem possivel passar os parametro de busca 
// Exemplo: /launches?name=Falcon&limit=2
// Esta rota retorna todos os foguetes com nome Falcon, sendo limitado a somente 2 resultados

// Sendo possivel passar a pagina que deseja ir como parametro
// Exemplo: /launches?page=1

//parametros possivel: /launches?Name=Falcon&page=1&limit=2

router.get('/launches', new ListarLaunchesController().handle)


// Rota responsavel por exibir os dados dos stats, sendo name, cores.reused, success

router.get('/launches/stats', new ListarLaunchesStatsController().handle)

export { router };