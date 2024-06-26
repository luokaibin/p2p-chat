import Back from '@icons/back.svg?react'
import { useParams, useNavigate } from 'react-router-dom';
import global from '@global';
import { useSnapshot } from 'valtio';
import { cn } from 'cn';

export const NavbarLeft = () => {
  const {p2pId} = useParams();
  const chatMap = useSnapshot(global.chatMap);
  const chat = chatMap[p2pId as string]
  const navigate = useNavigate();
  return (
    <div className={cn('flex items-center gap-1')} onClick={global.toggleTheme}>
      <span onClick={() => navigate(-1)} className={cn('flex w-8 h-6 justify-center items-center md:hidden cursor-pointer')}>
        <Back className={cn('w-5 h-5 fill-slate-700 dark:fill-white')} />
      </span>
      <span className={cn('!ml-0 text-base font-bold text-slate-500 dark:text-white')}>{p2pId}</span>
      <span className={cn('flex justify-center items-center px-2 py-1 text-base scale-50 origin-bottom-left rounded-md md:hidden', {
        "bg-lime-500 text-white": chat?.state === "online",
        "bg-gray-400": chat?.state === "offline",
      })}>
        {chat?.state || 'offline'}
      </span>
    </div>
  )
}