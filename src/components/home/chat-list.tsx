import { cn } from 'cn';
import React from 'react';
import { ChatItem } from './chat-item';
import global from '@global';
import { useSnapshot } from 'valtio';

export const ChatList:React.FC = () => {
  const {chatList} = useSnapshot(global.chatList);

  return (
    <div className={cn("flex flex-col")}>
      {chatList?.map((item) => {
        return (
          <ChatItem
            key={item._id}
            p2pId={item.p2pId as string}
            avatar={item.avatar}
            remark={item.remark}
            time={item.lastConnectTime}
          />
        )
      })}
    </div>
  )
}