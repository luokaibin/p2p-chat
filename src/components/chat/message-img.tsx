import { cn } from "cn";
import { MessageBox, MessageBoxProps } from "./message-box";

export interface MessageImageProps extends Omit<MessageBoxProps, 'children'> {
  img: string;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}
export const MessageImage: React.FC<MessageImageProps> = (props) => {
  const {img, onClick, ...rest} = props;
  const onLoad: React.ReactEventHandler<HTMLImageElement> = (event) => {
    const target = event.target as HTMLImageElement;
    const height = target.naturalHeight;
    const width = target.naturalWidth;
    target.setAttribute('data-width', width.toString());
    target.setAttribute('data-height', height.toString());
  }
  return (<MessageBox {...rest}>
    <img src={img} className={cn('cursor-pointer max-w-[300px]')} onLoad={onLoad} onClick={onClick} />
  </MessageBox>)
}