import type { NextPage } from "next"
import useTranslation from "next-translate/useTranslation"

import { Head } from "../../../components/Head"
import { Application } from "../../../components/Application"
import type { PagePropsWithAuthentication } from "../../../tools/authentication"
import {
  authenticationFromServerSide,
  AuthenticationProvider,
} from "../../../tools/authentication"
import { UserSettings } from "../../../components/Application/UserSettings"
import { GuildsProvider } from "../../../contexts/Guilds"

const UserSettingsPage: NextPage<PagePropsWithAuthentication> = (props) => {
  const { t } = useTranslation()

  return (
    <AuthenticationProvider authentication={props.authentication}>
      <GuildsProvider>
        <Head title={`Thream | ${t("application:user-settings")}`} />
        <Application
          path="/application/users/settings"
          title={t("application:user-settings")}
        >
          <UserSettings />
        </Application>
      </GuildsProvider>
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true,
})

export default UserSettingsPage
