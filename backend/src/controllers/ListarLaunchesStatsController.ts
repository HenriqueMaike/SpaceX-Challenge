import { Request, Response } from "express";
import { ListarLaunchesStatsService } from "../services/ListarLaunchesStatsService";

class ListarLaunchesStatsController{
    async handle(req: Request, res: Response){

        //instancia de ListarLaunchesStatsService de services
        const listarLaunchesStatsService = new ListarLaunchesStatsService();

        //recebe os dados tratados no services 
        const launchStats = await listarLaunchesStatsService.execute();

        //retorna ao usuario
        return res.json(launchStats);
    }
}

export {ListarLaunchesStatsController}