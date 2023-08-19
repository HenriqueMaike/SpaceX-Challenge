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
const debouncedLaunchesRequest = debounce(LaunchesRequest, 300);

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
    // Substitua a chamada direta por debouncedLaunchesRequest
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