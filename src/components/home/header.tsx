import { cn } from 'cn';
import React, { useEffect, useState } from 'react';
import global from '@global';
import { Avatar } from "react-chat-elements";
import Plus from '@icons/plus.svg?react'

export const Header: React.FC = () => {
  const [profile, setProfile] = useState<Awaited<ReturnType<typeof global['getProfile']>>>();
  useEffect(() => {
    global.getProfile().then(res => {
      setProfile(res)
    })
  }, [])
  return (
    <div className={cn("w-full bg-slate-100 h-16 px-4 flex items-center justify-between")}>
      <div className={cn("flex gap-1 items-center")}>
        <Avatar
          src={profile?.avatar || ''}
          alt="avatar"
          size="small"
          type="rounded"
        />
        <span className={cn("text-base")}>ID: {profile?.userId}</span>
      </div>
      <Plus className={cn("w-8 h-8 fill-slate-950 cursor-pointer")} />
    </div>
  )
}