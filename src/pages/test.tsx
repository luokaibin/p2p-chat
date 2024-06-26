import { cn } from "cn"
import {Textarea} from '@ui'
export const Test = () => {
  const onChange = () => {
    document.querySelector('html')?.classList.toggle('dark')
  }
  return (
    <div className={cn("w-screen h-screen flex flex-col gap-2")}>
      <div className={cn("grid grid-cols-2")}>
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" onChange={onChange} />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
      <div className="px-2 py-1">
        <Textarea
          minRows={3}
          maxRows={6}
          placeholder="Just a single line..."
        />
      </div>
    </div>
  )
}