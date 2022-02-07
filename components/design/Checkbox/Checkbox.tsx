import classNames from 'classnames'

export interface CheckboxProps extends React.ComponentPropsWithRef<'input'> {
  className?: string
  label: string
}

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { label, id, className } = props
  return (
    <div className={classNames('mt-4 flex items-center', className)}>
      <input
        {...props}
        type='checkbox'
        id={id}
        className='relative mr-3 min-h-[25px] min-w-[25px] cursor-pointer appearance-none rounded-md bg-gradient-to-t from-[#bcc7d4] to-[#d3dfed] transition-all before:absolute before:top-[50%] before:left-[59%] before:h-[12px] before:w-[2px] before:translate-x-[-59%] before:translate-y-[-50%] before:rotate-[40deg] before:scale-0 before:bg-black before:transition-all after:absolute after:top-[62.5%] after:left-[36%] after:h-[7px] after:w-[2px] after:translate-x-[-35%] after:translate-y-[-62.5%] after:rotate-[-50deg] after:scale-0 after:bg-black after:transition-all after:duration-200 checked:before:scale-100 checked:after:scale-100 dark:from-[#1f2937] dark:to-[#273547] dark:before:bg-white dark:after:bg-white'
      />
      <label
        className='duration-400 cursor-pointer select-none opacity-80 transition hover:opacity-100 '
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  )
}
