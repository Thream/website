import classNames from 'classnames'

export interface CheckboxProps extends React.ComponentPropsWithRef<'input'> {
  className?: string
  label: string
}

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { label, id, className } = props
  return (
    <div className={classNames('flex items-center mt-4', className)}>
      <input
        {...props}
        type='checkbox'
        id={id}
        className='relative appearance-none min-h-[25px] min-w-[25px] bg-gradient-to-t from-[#bcc7d4] to-[#d3dfed] dark:from-[#1f2937] dark:to-[#273547] mr-3 cursor-pointer rounded-md after:absolute before:absolute after:w-[2px] before:w-[2px] after:bg-black before:bg-black dark:after:bg-white dark:before:bg-white transition-all after:transition-all before:transition-all after:top-[62.5%] after:left-[36%] after:h-[7px] after:translate-x-[-35%] after:translate-y-[-62.5%] after:rotate-[-50deg] after:scale-0 after:duration-200 before:top-[50%] before:left-[59%] before:h-[12px] before:translate-x-[-59%] before:translate-y-[-50%] before:rotate-[40deg] before:scale-0 checked:after:scale-100 checked:before:scale-100'
      />
      <label
        className='cursor-pointer opacity-80 hover:opacity-100 transition duration-400 select-none '
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  )
}
