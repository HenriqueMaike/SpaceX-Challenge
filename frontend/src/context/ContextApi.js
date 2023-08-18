import React, { createContext, useState, useEffect, ReactNode } from "react";
import api from "../service/api";

export const ContextApi = createContext();

ContextProvider.propTypes = {
  children: ReactNode,
};

export function ContextProvider({ children }) {
  const [launches, setLaunches] = useState([{}]);

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
    } catch (error) {
      console.error("Error na buscas launches:", error);
    }
  }

  useEffect(() => {
    LaunchesRequest(page, search, limit);

    setSearch(search);
    setPage(page);
    setLimit(limit)

  }, [page, search, limit]);

  return (
    <ContextApi.Provider value={{ launches, LaunchesRequest }}>
      {children}
    </ContextApi.Provider>
  );
}