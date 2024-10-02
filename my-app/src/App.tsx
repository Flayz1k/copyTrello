import React from "react";

import { Routes, Route } from "react-router-dom";
import { Board } from "./pages/Board/board";
import Home from "./pages/Home/Home";
import Component from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Component />} />
      <Route path="board/:board_id" element={<Board />} />
    </Routes>
  );
}

export default App;
