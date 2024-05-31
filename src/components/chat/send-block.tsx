import { cn } from 'cn';
import React, { useEffect, useRef, useState } from 'react';
import global from '@global';
import Plus from '@icons/plus.svg?react';
import Photo from '@icons/photo.svg?react';
import { gsap } from "gsap";

import { Button, Input } from 'react-chat-elements';

interface SendBlockProps {
  targetId: string;
}

export const SendBlock:React.FC<SendBlockProps> = ({targetId}) => {
  const inputRef = useRef<HTMLTextAreaElement>()
  const containerEl = useRef<HTMLDivElement>(null);
  const toolEl = useRef<HTMLDivElement>(null);
  const [textMsg, setTextMsg] = useState('');
  const onKeyDown:React.KeyboardEventHandler<Element> = (event) => {
    const target = event.target as HTMLTextAreaElement;
    const value = target.value;
    if (event.shiftKey && event.key === 'Enter') {
      event.preventDefault();
      const { selectionStart, selectionEnd, value } = target;
      const newValue = value.slice(0, selectionStart) + '\n' + value.slice(selectionEnd);
      target.value = newValue;
      target.selectionStart = selectionStart + 1;
      target.selectionEnd = selectionStart + 1;
      return
    }
    if (event.code === 'Enter') {
      event.preventDefault()
    }
    if (event.code === 'Enter' && value) {
      global.send({type: 'text', value}, targetId)
      target.value = ''
      setTextMsg('')
    }
  }
  const onPaste: React.ClipboardEventHandler<Element> = async (event) => {
    const [clipboard] = await navigator.clipboard.read();
    if (clipboard.types?.[0].includes('image')) {
      event.preventDefault();
      const type = clipboard.types[0]
      const photo = await clipboard.getType(type);
      global.send({
        type: 'photo',
        value: photo
      }, targetId)
      return;
    }
  }
  const onChange = ({target}: {target: HTMLTextAreaElement}) => {
    setTextMsg(target?.value?.trim())
  }
  const onSend = () => {
    global.send({type: 'text', value: textMsg}, targetId);
    (inputRef.current as HTMLTextAreaElement).value = '';
    setTextMsg('')
  }
  const toolToggle = (hidden?: boolean) => {
    if (!toolEl.current) return
    const {height} = getComputedStyle(toolEl.current)
    hidden = typeof hidden === 'boolean' ? hidden : parseInt(height) > 2
    gsap.to(toolEl.current, {
      height: hidden ? 0 : 80,
      borderTopWidth: hidden ? 0 : 1,
      duration: 0.05,
      ease: "none"
    })
  }

  const onPhotoChange: React.InputHTMLAttributes<HTMLInputElement>['onChange'] = (e) => {
    const files = e.target.files;
    if (!files?.length) return;
    [...files].forEach((file) => {
      global.send({
        type: 'photo',
        value: file
      }, targetId)
    })
  }

  useEffect(() => {
    const onDocumentClick = (e: MouseEvent) => {
      if (!containerEl.current) return
      const rect = containerEl.current.getBoundingClientRect();
      if (e.x > rect.left && e.x < rect.right && e.y > rect.top && e.y < rect.bottom) return;
      toolToggle(true)
    }
    document.addEventListener('click', onDocumentClick)
    return () => {
      document.removeEventListener('click', onDocumentClick)
    }
  }, [])

  return (
    <div className={cn('flex flex-col duration-1000 bg-slate-100')} ref={containerEl}>
      <div className={cn('flex gap-2 w-full pt-1 pb-1 pr-1 pl-1')}>
        <Input
          placeholder="Type here..."
          multiline={true}
          maxHeight={140}
          className={cn('!min-w-fit flex-1')}
          onFocus={() => toolToggle(true)}
          onKeyDown={onKeyDown}
          onChange={onChange}
          onPaste={onPaste}
          referance={inputRef}
        />
        <Button text='Send' onClick={onSend} className={cn('h-fit shrink-0 self-end md:!hidden', {
          '!hidden': !textMsg?.length
        })} />
        <span onClick={() => toolToggle()} className={cn('h-fit self-end md:!hidden', {
          '!hidden': textMsg?.length
        })}>
          <Plus className={cn("w-8 h-8 fill-slate-950 cursor-pointer")} />
        </span>
      </div>
      <div className={cn('h-0 overflow-y-hidden flex items-center pl-3')} ref={toolEl}>
        <span className={cn('flex relative justify-center items-center w-14 h-14 rounded-lg bg-white')}>
          <Photo className={cn('w-8 h-8')} />
          <input onChange={onPhotoChange} className={cn('opacity-0 absolute top-0 bottom-0 right-0 left-0')} type="file" id="photo-input" accept="image/*" multiple />
        </span>
      </div>
    </div>
  )
}