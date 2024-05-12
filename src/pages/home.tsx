import React, { useEffect, useState } from 'react';
import {Header, CreateChat} from '@components/home'
import global from '@global';
export const Home: React.FC = () => {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    global.getChatList();
  }, [])
  return (
    <div>
      <Header onCreate={() => setHidden(false)} />
      <CreateChat hidden={hidden} onClose={setHidden} />
    </div>
  )
}