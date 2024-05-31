import React, { useEffect, useRef } from 'react';
import global from '@global';
import { useLoaderData, useParams } from 'react-router-dom';
import { MessageList, MessageType, Navbar } from 'react-chat-elements';
import { cn } from 'cn';
import { Message } from '@global/db';
import { proxy, useSnapshot } from 'valtio';
import { SendBlock, NavbarLeft } from '@components/chat';
import { useMsgHandle } from '@hooks'
import mangeBlobUrl from '@global/mangeBlobUrl';
import Close from '@icons/close.svg?react';
import { gsap } from "gsap";

const data: {message: MessageType[]} = proxy({
  message: []
})

export const Chat: React.FC = () => {
  const chatWindow = useRef<HTMLDivElement>(null);
  const warning = useRef<HTMLParagraphElement>(null);
  const {message}= useSnapshot(data);
  const {p2pId} = useParams();
  const dataSource = useLoaderData();
  const {handlePhotoMsg} = useMsgHandle()
  const chatMap = useSnapshot(global.chatMap);
  const chat = chatMap[p2pId as string]

  useEffect(() => {
    const message = (dataSource as Message[]).map(item => {
      const position = item.senderP2pId === item.p2pId ? 'left' : 'right';
      const type = item.type;
      const title = item.senderP2pId as string;
      let msg = {
        position,
        type,
        title,
        text: item.value as string
      };
      if (item.type === 'photo') {
        const photoInfo = handlePhotoMsg(item);
        msg = {
          ...msg,
          ...photoInfo
        }
      }
      return msg
    })
    data.message = message as MessageType[];
    const off = global.on(p2pId as string, (msg) => {
      const {type, value, senderP2pId, p2pId} = msg as Message;
      let message = {
        position: senderP2pId === p2pId ? 'left' : 'right',
        type,
        title: p2pId,
        text: value
      }
      if (type === 'photo') {
        const photoInfo = handlePhotoMsg(msg as Message);
        message = {
          ...message,
          ...photoInfo,
        }
      }
      data.message.push(message as MessageType)
    })
    return () => {
      off()
      mangeBlobUrl.clearObjectUrl()
    };
  }, [dataSource])

  useEffect(() => {
    const autoScroll = () => {
      setTimeout(() => {
        if (!chatWindow.current) return;
        const prevScrollTop = chatWindow.current.scrollTop;
        const currScrollTop = chatWindow.current.scrollHeight - chatWindow.current.clientHeight;
        const diff = currScrollTop - prevScrollTop;
        let duration = (Math.floor(diff / 60) || 1) * 0.03
        duration = duration < 0.05 ? 0.05 : duration,
        gsap.to(chatWindow.current, {
          scrollTop: currScrollTop,
          duration,
          ease: "none"
        })
      }, 50)
    }
    const observer = new MutationObserver(autoScroll);

    
    observer.observe(chatWindow.current as HTMLDivElement, {
      childList: true,
      subtree: true,
      characterData: true
    });
    const resizeObserver = new ResizeObserver(autoScroll);

    resizeObserver.observe(chatWindow.current as HTMLDivElement);
    return () => {
      observer.disconnect();
      resizeObserver.disconnect()
    }
  }, [])
  const onClose:React.MouseEventHandler<HTMLSpanElement> = () => {
    if (!warning.current) return
    const tl = gsap.timeline();
    tl.to(warning.current, {
      y: 10,
      duration: 0.048
    }).to(warning.current, {
      y: -40,
      opacity: 0,
      duration: 0.5
    }).to(warning.current, {
      display: 'none'
    })
  }
  useEffect(() => {
    if (!warning.current) return
    gsap.to(warning.current, {
      y: 'unset',
      opacity: 1,
      display: 'block',
      duration: 0
    })
  }, [p2pId])
  return (
    <div className={cn('flex-1 h-screen border-l flex flex-col relative')}>
      <Navbar
        left={<NavbarLeft />}
        // center=<div>Home</div>
        // right={}
        type="light"
      />
      {chat?.state !== 'online' && <p className={cn('message-warning absolute top-11 left-0 right-0 z-10')} ref={warning}>
        <span>If this person is not online, the message you send will not be received by the other person</span>
        <span onClick={onClose} className={cn('absolute w-8 h-8 right-3 top-3 flex justify-center items-center cursor-pointer')}>
          <Close className={cn('w-5 h-5 fill-gray-400')} />
        </span>
      </p>}
      <div className={cn('flex-1 overflow-y-auto hidden-scroll')} ref={chatWindow}>
        <MessageList
          className='message-list'
          lockable={true}
          toBottomHeight={'100%'}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          dataSource={message}
          referance={null}
        />
      </div>
      <SendBlock targetId={p2pId as string} />
    </div>
  )
}