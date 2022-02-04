import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Project from "./components/Project";
import Nav from "./containers/Nav/Nav";
import Content from "./containers/Content/Content";

function App() {
  return (
    <div className="App">
      <Nav />
      <Content>
        <BrowserRouter>
          <Routes>
            <Route path=":projectName" element={<Project />} />
          </Routes>
        </BrowserRouter>
      </Content>
    </div>
  );
}

export default App;
