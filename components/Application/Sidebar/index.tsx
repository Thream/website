import useTranslation from 'next-translate/useTranslation'

import { IconButton } from 'components/design/IconButton'
import { Avatar } from 'components/design/Avatar'
import { SidebarItem } from './SidebarItem'
import { SidebarList } from './SidebarList'
import { API_URL } from 'utils/api'
import { useGuilds } from 'contexts/Guilds'
import { Tooltip } from 'components/design/Tooltip'
import { useAuthentication } from 'utils/authentication'

export const Sidebar: React.FC = () => {
  const { guilds } = useGuilds()
  const { t } = useTranslation()
  const { user } = useAuthentication()

  return (
    <>
      <nav className='sidebar'>
        <SidebarList>
          <SidebarItem>
            <Tooltip content={t('application:settings')} direction='right'>
              <Avatar
                src='/images/icons/Thream.png'
                alt='Thream'
                width={60}
                height={60}
              />
            </Tooltip>
          </SidebarItem>
          <SidebarItem>
            <Tooltip content={t('application:settings')} direction='right'>
              <Avatar
                src={`${API_URL}${user.logo}`}
                alt={user.name}
                width={60}
                height={60}
              />
            </Tooltip>
          </SidebarItem>
          <SidebarItem>
            <Tooltip content={t('application:add-guild')} direction='right'>
              <IconButton icon='add' hasBackground />
            </Tooltip>
          </SidebarItem>
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
            padding: 0 15px;
          }
        `}
      </style>
    </>
  )
}
