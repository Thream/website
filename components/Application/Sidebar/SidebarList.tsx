export interface SidebarListProps extends React.ComponentPropsWithRef<'ul'> {}

export const SidebarList: React.FC<SidebarListProps> = (props) => {
  const { children, className } = props

  return (
    <>
      <ul className={`sidebar-list ${className ?? ''}`}>{children}</ul>

      <style jsx>
        {`
          .sidebar-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-flow: column wrap;
          }
        `}
      </style>
    </>
  )
}
