import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router  } from 'react-router-dom';
import App from './App';
// import {
//   createBrowserRouter,
//   RouterProvider,
// }  from "react-router-dom";

// import { Board } from './pages/Board/board';
// import  Home  from './pages/Home/Home';

// const home = createBrowserRouter([
//   {
//     path: "/",
//     element:<Home/>
//   }
// ])


// const router = createBrowserRouter([
//   {
//     path: "board/:id",
//     element: <Board/>,
//   },
//   {
//     path: "/",
//     element:<Home/>
//   }
// ]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  //   <RouterProvider router={router} />
  // </React.StrictMode>
  <Router>
    <App/>
  </Router>

);