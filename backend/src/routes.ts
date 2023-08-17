import {Router, Request, Response } from 'express';
import { CadastrarController } from './controllers/CadastrarController';

const router = Router();

//rotas de usuario

router.get('/', (req: Request, res: Response)=>{
    const message = {message: "Fullstack Challenge 🏅 - Space X API"};
    return res.json(message);
});

router.get('/launches', new CadastrarController().handle)

export { router };