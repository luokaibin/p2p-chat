import {forwardRef,memo} from 'react';
import {cn} from 'cn'
import TextareaAutosize, {TextareaAutosizeProps} from 'react-textarea-autosize';

export const Textarea = memo(forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>((props, ref) => {
  const {className, ...rest} = props
  return (
    <TextareaAutosize
      {...rest}
      ref={ref}
      className={cn("px-2 py-1 w-full outline-none rounded resize-none dark:bg-gray-700 dark:text-white", className)}
    />
  )
}))