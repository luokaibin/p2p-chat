import React from "react";
import { createBrowserRouter, Route, Link } from "react-router-dom";
import {Home} from '@pages/home'
const config = [
  {
    path: "/",
    element: (<Home />),
  },
  {
    path: "about",
    element: <div>About</div>,
  }
]

export const router = createBrowserRouter(config)