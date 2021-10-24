import {
  AuthenticationProvider,
  PagePropsWithAuthentication
} from 'utils/authentication'
import { Main } from './Main'
import { Sidebar } from './Sidebar'
import { Guilds, GuildsProvider } from 'contexts/Guilds'

export interface ApplicationProps extends PagePropsWithAuthentication {
  guilds: Guilds
}

export const Application: React.FC<ApplicationProps> = (props) => {
  return (
    <AuthenticationProvider authentication={props.authentication}>
      <GuildsProvider guilds={props.guilds}>
        <div className='application'>
          <Sidebar />
          <Main>{props.children}</Main>
        </div>

        <style jsx global>
          {`
            body {
              --sidebar-width: 11rem;
            }
          `}
        </style>
      </GuildsProvider>
    </AuthenticationProvider>
  )
}
