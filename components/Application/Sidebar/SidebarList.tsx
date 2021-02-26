export const SidebarList: React.FC = (props) => {
  return (
    <>
      <ul className='sidebar-list'>{props.children}</ul>

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
