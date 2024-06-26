import { cn } from "cn";

export interface MessageBoxProps {
  avatar?: string;
  children?: React.ReactNode;
  position?: 'left'|'right'|'center';
  /** message id */
  id: string|number;
  onAvatarClick?: React.MouseEventHandler<HTMLImageElement>;
}
export const MessageBox: React.FC<MessageBoxProps> = (props) => {
  const {avatar, children, position, onAvatarClick} = props;
  return (
    <div className={cn('flex items-start', {
      'flex-row-reverse': position === 'right',
    })}>
      <img onClick={onAvatarClick} src={avatar} alt="avatar" className={cn('w-10 h-10 rounded')} />
      <div className={cn(
        "flex min-h-10 bg-slate-200 ml-4 rounded px-3 py-1 relative break-all max-w-[70%]",
        "before:w-3 before:h-3 before:content-[''] before:block before:top-[12px] before:-left-4 before:absolute",
        "before:border-8 before:border-t-transparent before:border-b-transparent before:border-l-transparent before:border-r-slate-200",
        "dark:before:border-r-slate-700",
        "dark:bg-slate-700",
        {
          'flex-row-reverse mr-4 before:border-l-slate-200 before:border-r-transparent before:left-auto before:-right-4 dark:before:border-l-slate-700 dark:before:border-r-transparent': position === 'right',
        }
      )}>
        {children}
      </div>
    </div>
  )
}