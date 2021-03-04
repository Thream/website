export const Main: React.FC = () => {
  return (
    <>
      <main className='main'>
        <p>Main Content</p>
      </main>

      <style jsx>
        {`
          .main {
            padding: 2rem;
            margin-left: var(--sidebar-width);
            background-color: var(--color-background-secondary);
            min-height: 100vh;
            overflow: auto;
          }
        `}
      </style>
    </>
  )
}
