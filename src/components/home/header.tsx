import { cn } from 'cn';
import React from 'react';
import global from '@global';
import {useSnapshot} from 'valtio'
import { Avatar } from "react-chat-elements";
import Plus from '@icons/plus.svg?react'

interface HeaderProps {
  onCreate: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

export const Header: React.FC<HeaderProps> = ({onCreate}) => {
  const {profile} = useSnapshot(global.user);

  return (
    <div className={cn("w-full bg-slate-100 h-16 px-4 flex items-center justify-between")}>
      <div className={cn("flex gap-1 items-center")}>
        <div className={cn("w-fit h-fit relative")}>
          <Avatar
            src={profile?.avatar || ''}
            alt="avatar"
            size="small"
            type="rounded"
          />
          <span className={cn("w-2 h-2 absolute bottom-1 right-1 rounded-full", {
            "bg-lime-500": profile?.state === "online",
            "bg-gray-400": profile?.state !== "online"
          })} />
        </div>
        
        <span className={cn("text-base")}>ID: {profile?.p2pId}</span>
      </div>
      <Plus className={cn("w-8 h-8 fill-slate-950 cursor-pointer")} onClick={onCreate} />
    </div>
  )
}