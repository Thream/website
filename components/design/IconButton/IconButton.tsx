import classNames from "clsx"

export interface IconButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {}

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const { children, className, ...rest } = props

  return (
    <button
      className={classNames(
        "flex items-center justify-center text-center text-green-800 hover:animate-pulse focus:animate-pulse focus:outline-none dark:text-green-400",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
