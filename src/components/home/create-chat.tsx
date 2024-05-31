import { cn } from '@plugins/cn';
import Close from '@icons/close.svg?react';
import React, { useRef } from 'react';
import { Input, Button } from 'react-chat-elements'
import global from '@global';
interface CreateChatProps {
  hidden?: boolean;
  onClose: (hidden: true) => void;
}

export const CreateChat:React.FC<CreateChatProps> = ({hidden, onClose}) => {
  const inputRef = useRef<HTMLInputElement>();
  const onConnect = () => {
    const value = inputRef.current?.value;
    if (!value) return;
    global.connect(value).then((res) => {
      if (res) onClose(true)
    })
  }
  return (
    <div className={cn("fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center px-4 z-20", {
      'hidden': hidden
    })}>
      <div className={cn("fixed top-0 bottom-0 left-0 right-0 bg-slate-950/30")} />
      <div className={cn('bg-slate-100 w-full rounded-lg z-10')}>
        <div className={cn("h-14 flex items-center px-3 relative justify-between border-b")}>
          <span className={cn("text-lg")}>Create a new chat</span>
          <Close className={cn("fill-slate-950 w-6 h-6 cursor-pointer")} onClick={() => onClose(true)} />
        </div>
        <div className={cn("px-3 py-10")}>
          <div className={cn("flex items-center gap-3")}>
            <Input
              referance={inputRef}
              placeholder="Please enter the ID of the other party"
              multiline={false}
              maxHeight={24}
              className={cn("flex-1 !min-w-min rounded-lg")}
            />
            <Button text="Connect" title="Connect" onClick={onConnect} />
          </div>
        </div>
      </div>
    </div>
  )
}