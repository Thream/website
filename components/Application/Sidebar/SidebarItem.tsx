import { memo } from 'react'

export const SidebarItem: React.FC = memo((props) => {
  return (
    <>
      <li className='sidebar-item'>{props.children}</li>

      <style jsx>
        {`
          .sidebar-item {
            position: relative;
            margin: 10px;
            cursor: pointer;
          }
        `}
      </style>
    </>
  )
})
