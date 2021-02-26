import useTranslation from 'next-translate/useTranslation'

import { IconButton } from 'components/design/IconButton'
import { Avatar } from 'components/design/Avatar'
import { SidebarItem } from './SidebarItem'
import { SidebarList } from './SidebarList'
import { API_URL } from 'utils/api'
import { useGuilds } from 'contexts/Guilds'
import { Tooltip } from 'components/design/Tooltip'
import { useTheme } from 'contexts/Theme'

export const Sidebar: React.FC = () => {
  const { handleToggleTheme } = useTheme()
  const { guilds } = useGuilds()
  const { t } = useTranslation()

  return (
    <>
      <nav className='sidebar'>
        <SidebarList className='guilds-list'>
          <SidebarItem>
            <Tooltip content={t('application:settings')} direction='right'>
              <IconButton
                icon='settings'
                hasBackground
                onClick={handleToggleTheme}
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
            padding: 15px;
          }
          :global(.guilds-list) {
            overflow-y: scroll;
            overflow-x: hidden;
            flex-direction: row !important;
          }
          :global(.guilds-list)::-webkit-scrollbar {
            width: 0.5rem;
            margin-right: 10px;
          }
          :global(.guilds-list)::-webkit-scrollbar-track {
            background-color: rgba(36, 38, 45, 0.4);
          }
          :global(.guilds-list)::-webkit-scrollbar-thumb {
            background-color: var(--color-background-secondary);
          }
        `}
      </style>
    </>
  )
}
