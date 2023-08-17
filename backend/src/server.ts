import express, { Request, Response, NextFunction, request, response } from 'express'
import 'express-async-errors';
import cors from 'cors';

import { router } from './routes'
import { PopularBanco } from './middlewares/PopularBanco';

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

//Chama a função que popula o banco toda vez que o servidos é iniciado
PopularBanco();

// Agenda função popularBanco para ser chamada todos os dias às 9 horas da manhã
const cron = require('node-cron');
cron.schedule('0 9 * * *', async () => {
    try {
        await PopularBanco(); // Chama a função PopularBanco
        console.log('Atualização de dados execultado com sucesso.');
    } catch (error) {
        console.error('Erro ao execultar atualização ao popular dados no banco:', error);
    }
});

//tratamento de requisicao de error

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    //Se for uma instancia do tipo error
    if (err instanceof Error) {
        let statusCode = 500;
        
        //verificações de tipo de erro gerados para exibir a mensagem correspondente
        if (err.message === 'Error message') {
            statusCode = 400;
        } else if (err.message === 'sucesso sem body') {
            statusCode = 204;
        } else if (err.message === 'sucesso') {
            statusCode = 200;
        }

        return res.status(statusCode).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })

})

//Inicia o server na porta 3333 com a mensagem Servidor online!
app.listen(3333, () => console.log('Servidor online!'))