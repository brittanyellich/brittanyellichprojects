import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Project from "./components/Project";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path=":projectName" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
