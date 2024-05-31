import React from 'react'
import ReactDOM from 'react-dom/client'
import {router} from './router';
import { RouterProvider } from "react-router-dom";
import dayjs from 'dayjs';
import "dayjs/locale/zh"
import './index.css'
import "react-chat-elements/dist/main.css";

dayjs.locale('zh')

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
