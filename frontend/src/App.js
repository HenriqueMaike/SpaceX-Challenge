import React from "react";
import RoutesApp from "./routes";
import { ContextProvider } from "./context/ContextApi"; // Certifique-se de usar a importação correta aqui

function App() {
  return (
    <ContextProvider>
      <RoutesApp/>
    </ContextProvider>
  );
}

export default App;
