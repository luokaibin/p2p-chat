import React from 'react'
import ReactDOM from 'react-dom/client'
import {router} from './router';
import { RouterProvider } from "react-router-dom";
import './index.css'
import "react-chat-elements/dist/main.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );