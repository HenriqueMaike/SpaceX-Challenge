import React, { useContext, useEffect, useState } from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { ContextApi } from '../../context/ContextApi';

import styles from './styles.module.scss';

const GraficoPizza = () => {
  const { launchesAll } = useContext(ContextApi);
  const [rocketDataCounts, setRocketDataCounts] = useState({});
  const [successCounts, setSuccessCounts] = useState({ true: 0, false: 0 });
  const [rocketsByYear, setRocketsByYear] = useState({});

  useEffect(() => {
    if (launchesAll.results) {
      // Função para contar a ocorrência de cada rocket_data.name
      const countRocketNames = () => {
        const counts = {};
        launchesAll.results.forEach((launch) => {
          const rocketName = launch.rocket_data[0].name;
          counts[rocketName] = (counts[rocketName] || 0) + 1;
        });
        setRocketDataCounts(counts);
      };

      // Função para contar a ocorrência de "success": true e "success": false
      const countSuccessFailures = () => {
        const counts = { true: 0, false: 0 };
        launchesAll.results.forEach((launch) => {
          const success = launch.success;
          counts[success ? 'true' : 'false'] += 1;
        });
        setSuccessCounts(counts);
      };

      // Função para contar a ocorrência de foguetes por ano
      const countRocketsByYear = () => {
        const counts = {};
        launchesAll.results.forEach((launch) => {
          const year = new Date(launch.date_utc).getFullYear().toString();
          const rocketName = launch.rocket_data[0].name;
          if (!counts[year]) {
            counts[year] = {};
          }
          counts[year][rocketName] = (counts[year][rocketName] || 0) + 1;
        });
        setRocketsByYear(counts);
      };

      countRocketNames();
      countSuccessFailures();
      countRocketsByYear();
    }
  }, [launchesAll]);

  const rocketNames = Object.keys(rocketDataCounts);
  // Criar uma paleta de cores
  const colors = ['#8884d8', '#82ca9d', '#cd4569', '#e37400'];

  // Mapear os foguetes com cores da paleta
  const PizzaData = rocketNames.map((rocketName, index) => ({
    name: rocketName,
    rockets: rocketDataCounts[rocketName],
    fill: colors[index % colors.length],
  }));

  // Preparar os dados para o gráfico de barras
  const years = Object.keys(rocketsByYear);
  const BarData = years.map((year) => {
    const dataEntry = { name: year };
    rocketNames.forEach((rocketName) => {
      dataEntry[rocketName] = rocketsByYear[year][rocketName] || 0;
    });
    return dataEntry;
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.text}>
          <h3>Lançamento de foguetes</h3>
          <h3>Lançamento por ano</h3>
        </div>
        <div className={styles.containerChart}>
          <div className={styles.chart}>
            <PieChart width={300} height={300}>
              <Legend horizontalAlign="bottom" height={36} />
              <Pie data={PizzaData} dataKey="rockets" />
            </PieChart>
          </div>

          <div className={styles.chartBar}>
            <BarChart width={350} height={200} data={BarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
                {rocketNames.map((rocketName, index) => (
                  <Bar key={index} dataKey={rocketName} fill={colors[index % colors.length]} />
                ))}
            </BarChart>
          </div>
        </div>
        <div className={styles.resultados}>
          <h3>Resultados de lançamento</h3>
          <strong>Sucesso: {successCounts.true}</strong>
          <strong>Falhas: {successCounts.false}</strong>
        </div>
      </div>
    </>
  );
};

export default GraficoPizza;
