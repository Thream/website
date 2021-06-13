interface ContainerProps extends React.ComponentPropsWithRef<'div'> {}

export const Container: React.FC<ContainerProps> = (props) => {
  const { children, className } = props

  return (
    <>
      <div className={`container ${className ?? ''}`}>
        {children}
      </div>

      <style jsx>
        {`
          .container {
            height: calc(100vh - 110px);
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        `}
      </style>
    </>
  )
}
