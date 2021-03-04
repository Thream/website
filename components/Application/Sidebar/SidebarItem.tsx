export const SidebarItem: React.FC = (props) => {
  return (
    <>
      <li className='sidebar-item'>{props.children}</li>

      <style jsx>
        {`
          .sidebar-item {
            position: relative;
            margin: 10px;
          }
        `}
      </style>
    </>
  )
}
