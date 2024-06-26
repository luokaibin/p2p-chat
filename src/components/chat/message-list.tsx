import { MessageImageProps, MessageImage } from "./message-img"
import { MessageTextProps, MessageText } from "./message-text"
import omit from 'lodash-es/omit'

type MessageItem<K> = K & {type: 'photo'|'text', value: string};

type IMessageText = MessageItem<Omit<MessageTextProps, 'text'>>;
type IMessageImg = MessageItem<Omit<MessageImageProps, 'img'>>;
export type IMessage = IMessageText & IMessageImg;

type IAction = {
  onClick?: (message: IMessage) => void;
}

export interface MessageListProps {
  dataSource: IMessage[];
}

export const messageMap = {
  text: (item: Omit<IMessage, 'type'>) => <MessageText {...omit(item, 'value')} key={item.id} text={item.value} />,
  photo: (item: Omit<IMessage, 'type'>, action?: IAction) => <MessageImage {...omit(item, 'value')} onClick={() => action?.onClick?.({...item, type: 'photo'})} key={item.id} img={item.value} />
}
