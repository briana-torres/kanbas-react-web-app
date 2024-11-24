import { Navigate, Route, Routes } from "react-router";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import Lab5 from "./Lab5";
import TOC from "./TOC";
import store from "./store"; 
import { Provider } from "react-redux";
// import

export default function Labs() {
  return (
    <Provider store={store}>
    <div id="wd-labs" style={{ margin: 20 }}>
      <h1>Welcome to Web Dev</h1>
      <h1>Labs</h1>
      <h2>Briana Torres</h2>
      <h3>Section 02</h3>
      <TOC />
      <Routes>
        <Route path="/" element={<Navigate to="Lab1" />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3" element={<Lab3 />} />
        <Route path="Lab4" element={<Lab4 />} />
        <Route path="Lab5" element={<Lab5 />} />
        <Route path="web-app-repo" element={<div id="wd-github">
          <Navigate to="https://github.com/briana-torres/kanbas-react-web-app/tree/a1" />
        </div>}
        />
        <Route path="server-app-repo" element={<div id="wd-github">
          <Navigate to="https://github.com/briana-torres/kanbas-node-server-app/tree/a5" />
        </div>}
        />
        <Route path="server-app" element={<div id="wd-github">
          <Navigate to="https://kanbas-node-server-app-3qhi.onrender.com" />
        </div>}
        />
      </Routes>
    </div>
    </Provider>
  );
}