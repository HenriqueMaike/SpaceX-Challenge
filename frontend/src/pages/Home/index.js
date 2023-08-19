import React, { useContext, useState, useEffect } from 'react';
import { ContextApi } from '../../context/ContextApi';
import styles from './style.module.scss'
import Pagination from '../../components/pagination';
import Buscar from '../../components/Buscar';
import GraficoPizza from '../../components/Graficos';

function Home() {
    const { launches } = useContext(ContextApi);
    const [launchesData, setLaunchesData] = useState([]);

    useEffect(() => {
        if (launches.results) {
            setLaunchesData(launches.results);
        }
    }, [launches]);

    return (
        <div className={styles.container}>
            
                <GraficoPizza/>
                
                <h3>Busca registro de lançamento</h3>
                <Buscar/>
            <div className={styles.listaLaunches}>  
                <table className={styles.table}>
                    <div className={styles.theadDiv}>
                        <thead className={styles.thead}>
                            <tr>
                                <th>N do Voo</th>
                                <th>Logo</th>
                                <th>Missão</th>
                                <th>Data de Lançamento</th>
                                <th>Foguete</th>
                                <th>Resultado</th>
                                <th>Vídeo</th>
                            </tr>
                        </thead>
                    </div>
                    <tbody className={styles.tbody}>
                        {launchesData.map((launch) => (
                        <tr key={launch.id}>
                            <div className={styles.tbodyDiv}>
                                <td>
                                    {launch.flight_number}
                                </td>

                                <td>
                                    <img src={launch.links[0].patch_links[0].small} alt={`logo ${launch.name}`} />
                                </td>
                            </div>
                            
                            <div className={styles.tbodyDiv}>
                                <td>
                                    {launch.name}
                                </td>

                                <td>
                                    {
                                        (() => {
                                            const data = new Date(launch.date_utc);
                                            const dia = data.getUTCDate().toString().padStart(2, '0');
                                            const mes = (data.getUTCMonth() + 1).toString().padStart(2, '0');
                                            const ano = data.getUTCFullYear();
                                            const data_formatada = `${dia}/${mes}/${ano}`;
                                            return data_formatada;
                                        })()
                                    }
                                </td>
                            </div>

                            <div className={styles.tbodyDiv}>
                                <td>
                                    {launch.rocket_data[0].name}
                                </td>

                                <td>                                 
                                {
                                    (() => {
                                        return launch.success ? (
                                        <span style={{ backgroundColor: "#17a362", padding: "0.2em 0.5em", borderRadius: "4px", color: "#FFF", height: 20 }}>
                                            Sucesso
                                        </span>
                                        ) : (
                                        <span style={{ backgroundColor: "#da4a64", padding: "0.2em 0.5em", borderRadius: "4px", color: "#FFF", height: 20 }}>
                                            Falha
                                        </span>
                                        );
                                    })()
                                }
                                </td>
                            </div>

                            <div className={styles.tbodyDiv}>
                                <td>
                                    <a href={launch.links[0].webcast} target='blank'>
                                        <img src='./youtube.png' alt='youtube' /> 
                                    </a>
                                </td>
                            </div>

                        </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
            <div>
                <Pagination/>
            </div>
        </div>
    );
}

export default Home;