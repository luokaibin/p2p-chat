import { cn } from 'cn';
import React from 'react';
import global from '@global';
import {useSnapshot} from 'valtio'
import { relativeTime } from 'relativeTime';
import { NavLink } from 'react-router-dom';

export interface ChatItemProps {
  avatar?: string;
  p2pId: string;
  remark?: string;
  time?: number;
}

export const ChatItem:React.FC<ChatItemProps> = ({avatar, remark, p2pId, time}) => {
  const chatMap = useSnapshot(global.chatMap);
  const chat = chatMap[p2pId]
  return (
    <NavLink to={`/chat/${p2pId}`} className={cn("flex justify-between gap-2 px-3 py-2 items-center")}>
      <div className={cn('w-fit h-fit relative')}>
        <img
          src={avatar || ''}
          alt="avatar"
          className={cn("w-10 h-10 rounded-md")}
        />
        <span className={cn("w-2 h-2 absolute bottom-1 right-1 rounded-full", {
          "bg-lime-500": chat?.state === "online",
          "bg-gray-400": chat?.state !== "online"
        })} />
      </div>
      <div className={cn(
        'flex flex-1 flex-col self-start',
        "dark:text-zinc-300"
      )}>
        <div className={cn('flex justify-between')}>
          <span>{remark || p2pId}</span>
          <span className={cn("text-xs")}>{relativeTime(chat.latest?.createAt || time)}</span>
        </div>
        <div className={cn('flex justify-between')}>
          <span>{chat.latest?.type === 'photo' ? '[pic]' : (chat.latest?.value?.toString())}</span>
          <span className={cn('bg-red-500 w-7 h-7 flex justify-center items-center text-white rounded-full text-xs scale-75 font-bold tracking-tighter', {
            'hidden': !chat?.unread
          })}>
            {chat.unread || ''}
          </span>
        </div>
      </div>
    </NavLink>
  )
}