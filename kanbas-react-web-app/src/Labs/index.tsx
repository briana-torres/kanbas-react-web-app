import { Navigate, Route, Routes } from "react-router";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import TOC from "./TOC";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Welcome to Web Dev</h1>
      <h1>Labs</h1>
      <h2>Briana Torres</h2>
      <TOC />
      <Routes>
        <Route path="/" element={<Navigate to="Lab1" />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3" element={<Lab3 />} />
        <Route path="github-repo" element={<div id="wd-github">
          <Navigate to="https://github.com/briana-torres/kanbas-react-web-app/tree/a1" />
        </div>}
        />
      </Routes>
    </div>
  );
}