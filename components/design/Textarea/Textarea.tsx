import TextareaAutosize from 'react-textarea-autosize'

export interface TextareaProps
  extends React.ComponentPropsWithoutRef<'textarea'> {
  label: string
}

export const Textarea: React.FC<TextareaProps> = (props) => {
  const { label, id } = props

  return (
    <div className='flex flex-col'>
      <div className='flex justify-between mt-6 mb-2'>
        <label className='pl-1' htmlFor={id}>
          {label}
        </label>
      </div>
      <div className='mt-0 relative'>
        <TextareaAutosize
          className='p-3 rounded-lg bg-[#f1f1f1] text-[#2a2a2a] caret-green-600 font-paragraph w-full focus:border focus:outline-none resize-none focus:shadow-green overflow-hidden'
          placeholder={label}
          wrap='soft'
          id={id}
        />
      </div>
    </div>
  )
}