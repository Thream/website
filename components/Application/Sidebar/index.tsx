import Image from 'next/image'

import { IconButton } from 'components/design/IconButton'
import { Avatar } from 'components/design/Avatar'
import { SidebarItem } from './SidebarItem'
import { SidebarList } from './SidebarList'
import { useAuthentication } from 'utils/authentication'
import { API_URL } from 'utils/api'

export const Sidebar: React.FC = () => {
  const { user } = useAuthentication()

  return (
    <>
      <nav className='sidebar'>
        <SidebarList>
          <SidebarItem>
            <Image
              src='/images/icons/Thream.png'
              alt='Thream'
              width={60}
              height={60}
            />
          </SidebarItem>
          <SidebarItem>
            <IconButton icon='add' hasBackground />
          </SidebarItem>
        </SidebarList>

        <SidebarList>
          <SidebarItem>
            <IconButton icon='settings' hasBackground />
          </SidebarItem>
          <SidebarItem>
            <Avatar
              src={`${API_URL}${user.logo}`}
              alt={user.name}
              width={60}
              height={60}
            />
          </SidebarItem>
        </SidebarList>
      </nav>

      <style jsx>
        {`
          .sidebar {
            display: flex;
            flex-flow: column wrap;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            background-color: var(--color-background-primary);
            width: var(--sidebar-width);
            height: 100vh;
          }
        `}
      </style>
    </>
  )
}
