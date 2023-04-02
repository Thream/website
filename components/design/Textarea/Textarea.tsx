import type { TextareaAutosizeProps } from 'react-textarea-autosize'
import TextareaAutosize from 'react-textarea-autosize'

export interface TextareaProps extends TextareaAutosizeProps {
  label: string
}

export const Textarea: React.FC<TextareaProps> = (props) => {
  const { label, id, ...rest } = props

  return (
    <div className='flex flex-col'>
      <div className='mb-2 mt-6 flex justify-between'>
        <label className='pl-1' htmlFor={id}>
          {label}
        </label>
      </div>
      <div className='relative mt-0'>
        <TextareaAutosize
          className='w-full resize-none overflow-hidden rounded-lg bg-[#f1f1f1] p-3 font-paragraph text-[#2a2a2a] caret-green-600 focus:border focus:shadow-green focus:outline-none'
          wrap='soft'
          id={id}
          name={id}
          {...rest}
        />
      </div>
    </div>
  )
}
