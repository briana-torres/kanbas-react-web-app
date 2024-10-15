import { Navigate, HashRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Labs from "./Labs";
import Kanbas from "./Kanbas";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/Labs" />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
          <Route path="/Labs/*" element={<Labs />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
