import React, { useState } from 'react';
import {Header, CreateChat, ChatList} from '@components/home'
import {cn} from 'cn';
import {Outlet, useLocation} from 'react-router-dom'
export const Home: React.FC = () => {
  const [hidden, setHidden] = useState(true);
  const location = useLocation()

  return (
    <div className={cn("flex")}>
      <div className={cn("w-screen md:w-[290px]", {
        'hidden': location.pathname !== '/',
        'md:block': location.pathname !== '/'
      })}>
        <Header onCreate={() => setHidden(false)} />
        <ChatList />
        <CreateChat hidden={hidden} onClose={setHidden} />
      </div>
      <Outlet />
    </div>
  )
}