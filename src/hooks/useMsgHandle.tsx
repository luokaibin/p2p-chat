import { Message } from "@global/db"
import { useCallback } from "react"
import mangeBlobUrl from '@global/mangeBlobUrl'
import { cn } from 'cn';

export const useMsgHandle = () => {
  const handlePhotoMsg = useCallback((msg: Message) => {
    if (msg.type !== 'photo') return;
    const position = msg.senderP2pId === msg.p2pId ? 'left' : 'right';
    return {
      data: {
        status: {
          click: true,
          download: true,
          loading: false,
          error: false,
        },
        uri: mangeBlobUrl.createObjectURL(msg.value as Blob),
      },
      text: '',
      className: cn({
        'pl-[34%]': position === 'right',
        'pr-[34%]': position === 'left',
      })
    }
  }, [])
  return {
    handlePhotoMsg
  }
}