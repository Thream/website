export interface SidebarListProps extends React.ComponentPropsWithRef<'ul'> {}

export const SidebarList: React.FC<SidebarListProps> = (props) => {
  const { children, ...rest } = props

  return (
    <>
      <ul {...rest} className='sidebar-list'>
        {children}
      </ul>

      <style jsx>
        {`
          .sidebar-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-flow: column wrap;
            overflow-y: auto;
            overflow-x: hidden;
            flex-direction: row !important;
          }
        `}
      </style>
    </>
  )
}
