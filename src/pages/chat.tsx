import React, { useEffect, useRef } from 'react';
import global from '@global';
import { useLoaderData, useParams } from 'react-router-dom';
import { cn } from 'cn';
import { Message } from '@global/db';
import { proxy, useSnapshot } from 'valtio';
import { SendBlock, NavbarLeft, MessageListProps, messageMap, IMessage } from '@components/chat';
import { useMsgHandle } from '@hooks'
import mangeBlobUrl from '@global/mangeBlobUrl';
import Close from '@icons/close.svg?react';
import { gsap } from "gsap";
import { IDbId } from '@global/type';
import omit from 'lodash-es/omit'
import { imagePreview } from '@plugins/imagePreview';

const data: {message: MessageListProps['dataSource']} = proxy({
  message: []
})

export const Chat: React.FC = () => {
  const chatWindow = useRef<HTMLDivElement>(null);
  const warning = useRef<HTMLParagraphElement>(null);
  const {message}= useSnapshot(data);
  const {p2pId} = useParams();
  const dataSource = useLoaderData();
  const chatMap = useSnapshot(global.chatMap);
  const {handlePhotoMsg} = useMsgHandle()
  const chat = chatMap[p2pId as string]

  useEffect(() => {

    const message = (dataSource as IDbId<Message>[]).map(handlePhotoMsg)
    data.message = message as MessageListProps['dataSource'];
    const off = global.on<IDbId<Message>>(p2pId as string, (msg) => {
      const message = handlePhotoMsg(msg);
      data.message.push(message)
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
  const onMessageClick = (message: IMessage) => {
    if (message.type === 'photo') {
      const imgs = (chatWindow.current as HTMLDivElement).querySelectorAll<HTMLImageElement>('img[data-width]');
      const dataSource = Array.from(imgs).map((img) => ({
        src: img.getAttribute('src') as string,
        width: parseInt(img.getAttribute('data-width') as string),
        height: parseInt(img.getAttribute('data-height') as string),
        alt: ''
      }))
      imagePreview(dataSource, message.value)
    }
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
    <div className={cn('flex-1 overflow-hidden h-screen flex flex-col relative')}>
      <div className={cn('px-2.5 py-3 bg-slate-100 dark:bg-gray-900')}>
        <NavbarLeft />
      </div>
      {chat?.state !== 'online' && <p className={cn('message-warning pr-7 absolute top-11 left-0 right-0 z-10')} ref={warning}>
        <span>If this person is not online, the message you send will not be received by the other person</span>
        <span onClick={onClose} className={cn('absolute w-8 h-8 right-0 top-0 pt-2 pr-2 flex justify-center items-center cursor-pointer')}>
          <Close className={cn('w-5 h-5 fill-gray-400')} />
        </span>
      </p>}
      <div className={cn('flex-1 overflow-y-auto hidden-scroll')} ref={chatWindow}>
        <div className={cn('flex flex-col gap-2 px-3 py-2')}>
          {
            message.map(item => {
              const renderMessage = messageMap[item.type];
              return renderMessage(omit(item, ['type']), {onClick: onMessageClick})
            })
          }
        </div>
      </div>
      <SendBlock targetId={p2pId as string} />
    </div>
  )
}