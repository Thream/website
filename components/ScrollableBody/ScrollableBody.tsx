export const ScrollableBody: React.FC = (props) => {
  const { children } = props

  return (
    <>
      {children}
      <style jsx global>{`
        body {
          scrollbar-width: thin;
          scrollbar-color: var(--scroll-bar-color) var(--scroll-bar-bg-color);
          z-index: 1000;
          height: calc(100vh - 64px);
          overflow-y: auto;
        }
      `}</style>
    </>
  )
}
