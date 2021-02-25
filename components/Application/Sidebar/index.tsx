import Image from 'next/image'

import { IconButton } from 'components/design/IconButton'
import { Avatar } from 'components/design/Avatar'
import { SidebarItem } from './SidebarItem'
import { SidebarList } from './SidebarList'
import { useAuthentication } from 'utils/authentication'
import { API_URL } from 'utils/api'
import { useGuilds } from 'contexts/Guilds'
import { Tooltip } from 'components/design/Tooltip'
import { useTheme } from 'contexts/Theme'

export const Sidebar: React.FC = () => {
  const { authentication, user } = useAuthentication()
  const { handleToggleTheme } = useTheme()
  const { guilds } = useGuilds()

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
            <Tooltip content='Add a Guild' direction='right'>
              <IconButton icon='add' hasBackground />
            </Tooltip>
          </SidebarItem>
        </SidebarList>

        <SidebarList>
          {guilds.rows.map((row) => {
            return (
              <SidebarItem key={row.id}>
                <Tooltip content={row.guild.name} direction='right'>
                  <Avatar
                    src={`${API_URL}${row.guild.icon}`}
                    alt={row.guild.name}
                    width={60}
                    height={60}
                  />
                </Tooltip>
              </SidebarItem>
            )
          })}
        </SidebarList>

        <SidebarList>
          <SidebarItem>
            <Tooltip content='Settings' direction='right'>
              <IconButton
                icon='settings'
                hasBackground
                onClick={handleToggleTheme}
              />
            </Tooltip>
          </SidebarItem>
          <SidebarItem>
            <Tooltip
              content={user.name}
              direction='right'
              onClick={async () => await authentication.signout()}
            >
              <Avatar
                src={`${API_URL}${user.logo}`}
                alt={user.name}
                width={60}
                height={60}
              />
            </Tooltip>
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
