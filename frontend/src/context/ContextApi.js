import React, { createContext, useState, useEffect, ReactNode } from "react";
import api from "../service/api";
import debounce from 'lodash/debounce';

export const ContextApi = createContext();

ContextProvider.propTypes = {
  children: ReactNode,
};

export function ContextProvider({ children }) {
const [launches, setLaunches] = useState([{}]);
const [launchesAll, setLaunchesAll] = useState([{}]);

const [page, setPage] = useState();
const [search, setSearch] = useState('');
const [limit, setLimit] = useState();

//função que faz a requisição da API com os params de busca, de 5 em 5 item como na paginação
async function LaunchesRequest(page, search, limit) {
  try {
    const response = await api.get('launches', {
      params:{
        page: page,
        search: search,
        limit: limit,
      }
    });
    const launchData = response.data;
    setLaunches(launchData);
  
  LaunchesAllRequest(page, search, launchData.totalDocs);
  } catch (error) {
    console.error("Error na busca de launches:", error);
  }
}

// Aplicar debounce a LaunchesRequest com um atraso de 300 milissegundos
const debouncedLaunchesRequest = debounce(LaunchesRequest, 3000);

  //função utilizada para obter dados para os graficos, este obtem todos os objetos em results 
  async function LaunchesAllRequest(page, search, limit) {
    try {
      const response = await api.get('launches', {
        params:{
          page: 1,
          search: '',
          limit: limit,
        }
      });
      const launchData = response.data;
      setLaunchesAll(launchData);

    } catch (error) {
      console.error("Error na busca de todas as launches:", error);
    }
  }

  useEffect(() => {
    // função debounce chamada no lugar de lauchesRequest para aguarda 300 milissegundos
    debouncedLaunchesRequest(page, search, limit);

    setSearch(search);
    setPage(page);
    setLimit(limit);

  }, [page, search, limit]);

  return (
    <ContextApi.Provider value={{ launches, launchesAll, LaunchesRequest, LaunchesAllRequest }}>
      {children}
    </ContextApi.Provider>
  );
}