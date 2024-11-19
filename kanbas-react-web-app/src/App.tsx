import { Navigate, HashRouter, Route, Routes } from "react-router-dom";
import Labs from "./Labs";
import Kanbas from "./Kanbas";
import "./App.css";
import store from "./Kanbas/store";
import { Provider } from "react-redux";

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
          <Route path="/" element={<Navigate to="/Labs" />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
          <Route path="/Labs/*" element={<Labs />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
