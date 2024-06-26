import { cn } from "cn";
import { MessageBox, MessageBoxProps } from "./message-box";

export interface MessageTextProps extends Omit<MessageBoxProps, 'children'> {
  text: string;
}
export const MessageText: React.FC<MessageTextProps> = (props) => {
  const {text, ...rest} = props;
  return (<MessageBox {...rest}>
    <span className={cn('dark:text-white')}>{text}</span>
  </MessageBox>)
}