export const SidebarItem: React.FC = (props) => {
  return (
    <>
      <li className='sidebar-item'>{props.children}</li>

      <style jsx>
        {`
          .sidebar-item {
            margin: 10px;
          }
        `}
      </style>
    </>
  )
}
