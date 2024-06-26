import { RouteObject, createBrowserRouter } from "react-router-dom";
import {Home} from '@pages/home'
import {Chat} from '@pages/chat'
import {Test} from '@pages/test'

import global from '@global';

const config:RouteObject[] = [
  {
    path: "/",
    element: (<Home />),
    children: [
      {
        path: 'chat/:p2pId',
        element: (<Chat />),
        loader: async ({params: {p2pId}}) => {
          const {docs} = await global.message.find({
            selector: {p2pId, createAt: {'$exists': true}},
            sort: [{createAt: 'asc'}]
          })
          global.markAsRead(p2pId as string)
          return docs;
        }
      }
    ]
  },
  {
    path: "/test",
    element: (<Test />)
  }
]

export const router = createBrowserRouter(config)