import React, { createContext, useState, useEffect } from "react";
import api from "../service/api";

export const ContextApi = createContext();

export function ContextProvider({ children }) {
  const [launches, setLaunches] = useState([{}]);

  const [page, setPage] = useState();
  const [name, setName] = useState('');
  const [limit, setLimit] = useState();

  async function LaunchesRequest(page, name, limit) {
    try {
      const response = await api.get('launches', {
        params:{
          page: page,
          name: name,
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
    LaunchesRequest(page, name, limit);

    setName(name);
    setPage(page);
    setLimit(limit)

  }, [page, name, limit]);

  return (
    <ContextApi.Provider value={{ launches, LaunchesRequest }}>
      {children}
    </ContextApi.Provider>
  );
}