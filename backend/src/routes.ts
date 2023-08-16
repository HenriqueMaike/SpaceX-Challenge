import {Router, Request, Response } from 'express';
import { CadastrarController } from './controllers/CadastrarController';
import { PopularBanco }  from './middlewares/PopularBanco';

const router = Router();

//rotas de usuario

router.get('/', (req: Request, res: Response)=>{
    const message = {message: "Fullstack Challenge 🏅 - Space X API"};
    return res.json(message);
});

router.get('/launches', PopularBanco, new CadastrarController().handle)

export { router };