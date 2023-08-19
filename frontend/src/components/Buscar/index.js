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

    const debouncedSearch = debounce(LaunchesRequest, 300);

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