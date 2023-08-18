import React from 'react';
import { Link } from 'react-router-dom';
import './error.scss';

function Error(){
    return(
        <div className='erro'>
            <h1>404</h1>
            <h2>Esta pagina não existe.</h2>
            <Link to={'/'}>Voltar a tela inicial</Link>
        </div>
    );
}

export default Error;