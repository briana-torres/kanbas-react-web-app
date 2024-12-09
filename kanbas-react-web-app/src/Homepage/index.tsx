import { Navigate, Route, Routes } from "react-router";
import TOC from "./TOC"; 

export default function Homepage() {
  return (
    <div id="wd-labs" style={{ margin: 20 }}>
      <h1>Web Dev Final Project</h1>
      <h2>Briana Torres, Kevin Daliri, Laksh Tyagi, and Ahamed Malik Diallo</h2>
      <h3>Section 02</h3>
      <TOC />
      <Routes>
        <Route path="web app repo" element={<div id="wd-github">
          <Navigate to="https://github.com/briana-torres/final-project-web-app" />
        </div>}
        />
        <Route path="server repo" element={<div id="wd-github">
          <Navigate to="https://github.com/briana-torres/final-project-server" />
        </div>}
        />
      </Routes>
    </div>
  );
}