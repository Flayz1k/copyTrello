import React from "react";

import { Routes, Route } from "react-router-dom";
import { Board } from "./pages/Board/board";
import Home from "./pages/Home/Home";
import Component from "./pages/Home/Home";
import store from "./pages/Board/ReduxStore/store";
import { Provider } from "react-redux";
import Authorization from "./pages/Board/components/Authorization/Authorization";
import SignUp from "./pages/Board/components/Authorization/SignUp";
function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/login" element={<Authorization />} />
        <Route path="/authorization" element={<SignUp />} />
        <Route path="/" element={<Component />} />
        <Route path="board/:board_id" element={<Board />} />
      </Routes>
    </Provider>
  );
}

export default App;
