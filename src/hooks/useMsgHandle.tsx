import { Message } from "@global/db"
import { useCallback } from "react"
import global from '@global';

import mangeBlobUrl from '@global/mangeBlobUrl'
import { cn } from 'cn';
import { IDbId } from "@global/type";
import { MessageListProps } from "@components/chat";

const formatValueByType = (type: Message['type'], value: Message['value']): string => {
  if (type === 'photo') return mangeBlobUrl.createObjectURL(value as Blob);
  if (type === 'text') return value as string;
  return ''
}

export const useMsgHandle = () => {
  const handlePhotoMsg = useCallback((msg: IDbId<Message>):MessageListProps['dataSource'][number] => {
    const position = msg.senderP2pId === msg.p2pId ? 'left' : 'right';
    return {
      position,
      avatar: msg.senderP2pId ? global.genSquareAvatar(msg.senderP2pId) : undefined,
      id: msg._id,
      type: msg.type,
      value: formatValueByType(msg.type, msg.value),
    }
  }, [])
  return {
    handlePhotoMsg
  }
}