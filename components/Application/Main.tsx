export const Main: React.FC = (props) => {
  return (
    <>
      <main className='main'>{props.children}</main>

      <style jsx>
        {`
          .main {
            padding: 2rem;
            margin-left: var(--sidebar-width);
            background-color: var(--color-background-secondary);
            min-height: 100vh;
            overflow: auto;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        `}
      </style>
    </>
  )
}
