import { cn } from 'cn';
import React from 'react';
import global from '@global';
import {useSnapshot} from 'valtio'
import Plus from '@icons/plus.svg?react'

interface HeaderProps {
  onCreate: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

export const Header: React.FC<HeaderProps> = ({onCreate}) => {
  const {profile} = useSnapshot(global.user);

  return (
    <div className={cn(
      "w-full bg-slate-100 h-16 px-4 flex items-center justify-between",
      "dark:bg-gray-900"
    )}>
      <div className={cn("flex gap-1 items-center")}>
        <div className={cn("w-fit h-fit relative")}>
          <img
            src={profile?.avatar || ''}
            alt="avatar"
            className={cn('w-9 h-9 rounded')}
          />
          <span className={cn("w-2 h-2 absolute bottom-1 right-1 rounded-full", {
            "bg-lime-500": profile?.state === "online",
            "bg-gray-400": profile?.state !== "online"
          })} />
        </div>
        
        <span className={cn("text-base dark:text-zinc-300")}>ID: {profile?.p2pId}</span>
      </div>
      <Plus className={cn(
        "w-8 h-8 fill-slate-950 cursor-pointer",
        "dark:fill-zinc-300"
      )} onClick={onCreate} />
    </div>
  )
}