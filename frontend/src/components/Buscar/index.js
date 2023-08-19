import React, { useContext, useEffect, useState } from "react";
import { ContextApi } from "../../context/ContextApi";
import debounce from 'lodash/debounce';

import styles from './styles.module.scss'

function Buscar() {
    const { LaunchesRequest } = useContext(ContextApi);
    const { launches } = useContext(ContextApi);

    const [search, setSearch] = useState('');

    const page = 1;
    const limit = launches.limit;

    // Aplicar debounce a LaunchesRequest com um atraso de 300 milissegundos
    const debouncedSearch = debounce(LaunchesRequest, 300);

    //UseEffect para chamar a função LaunchesRequest que passa pelo debounce coms os params de busca
    useEffect(() => {
        debouncedSearch(page, search, limit);
    }, [page, search, limit]);

    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Digite aqui a missão"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
    );
}

export default Buscar;