import React, { useState } from 'react';
import {Header, CreateChat} from '@components/home'
export const Home: React.FC = () => {
  const [hidden, setHidden] = useState(true);
  return (
    <div>
      <Header onCreate={() => setHidden(false)} />
      <CreateChat hidden={hidden} onClose={setHidden} />
    </div>
  )
}