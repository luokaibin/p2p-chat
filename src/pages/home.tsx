import React, { useMemo, useState } from 'react';
import {Header, CreateChat} from '@components/home'
import {useSnapshot} from 'valtio'
import global from '@global';
import { ChatList, type IChatItemProps } from "react-chat-elements"
export const Home: React.FC = () => {
  const [hidden, setHidden] = useState(true);

  const {chatList} = useSnapshot(global.chatList);

  const dataSource: IChatItemProps[] = useMemo(() => {
    return chatList.map((chat, index) => {
      const id = chat._id || chat.p2pId || index.toString();
      const avatar = chat.avatar || global.genSquareAvatar(id);
      return {id, avatar}
    })
  }, [chatList])
  return (
    <div>
      <Header onCreate={() => setHidden(false)} />
      <ChatList dataSource={dataSource} id={1111} lazyLoadingImage='' />
      <CreateChat hidden={hidden} onClose={setHidden} />
    </div>
  )
}