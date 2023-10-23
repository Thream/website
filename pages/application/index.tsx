import type { NextPage } from "next"

import { Head } from "../../components/Head"
import { Application } from "../../components/Application"
import { PopupGuild } from "../../components/Application/PopupGuild"
import type { PagePropsWithAuthentication } from "../../tools/authentication"
import {
  authenticationFromServerSide,
  AuthenticationProvider,
} from "../../tools/authentication"
import { GuildsProvider } from "../../contexts/Guilds"

const ApplicationPage: NextPage<PagePropsWithAuthentication> = (props) => {
  return (
    <AuthenticationProvider authentication={props.authentication}>
      <GuildsProvider>
        <Head title="Thream | Application" />
        <Application path="/application" title="Application">
          <PopupGuild />
        </Application>
      </GuildsProvider>
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true,
})

export default ApplicationPage
