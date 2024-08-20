import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';

// import reportWebVitals from './reportWebVitals';
// import {createBrowserRouter,RouterProvider,Route,Routes} from "react-router-dom";
// import { Board } from './pages/Board/board';
// import  Home  from './pages/Home/Home';

// function App() {
//     return (
//       <Routes>
//           <Route path="/" element={<Home/>} />
//           <Route path="/board" element={<Board/>} />
//       </Routes>
//     );
//   }
//   export default App
import A from './pages/Board/aa';

import { Routes, Route } from 'react-router-dom';
import { Board } from './pages/Board/board';
import  Home  from './pages/Home/Home';
function App() {
    return (
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="board/:board_id" element={<Board/>} />
  
      </Routes>
    );
  }
  
  export default App;