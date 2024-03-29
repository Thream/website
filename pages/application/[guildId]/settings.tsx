import type { NextPage } from "next"
import useTranslation from "next-translate/useTranslation"

import { Head } from "../../../components/Head"
import { Application } from "../../../components/Application"
import type { PagePropsWithAuthentication } from "../../../tools/authentication"
import {
  authenticationFromServerSide,
  AuthenticationProvider,
} from "../../../tools/authentication"
import type { GuildMember } from "../../../contexts/GuildMember"
import { GuildMemberProvider } from "../../../contexts/GuildMember"
import { GuildsProvider } from "../../../contexts/Guilds"
import { GuildSettings } from "../../../components/Application/GuildSettings"

export interface GuildSettingsPageProps extends PagePropsWithAuthentication {
  guildId: number
  guildMember: GuildMember
}

const GuildSettingsPage: NextPage<GuildSettingsPageProps> = (props) => {
  const { guildId, authentication, guildMember } = props
  const { t } = useTranslation()

  const path = { guildId }

  return (
    <AuthenticationProvider authentication={authentication}>
      <GuildsProvider>
        <GuildMemberProvider guildMember={guildMember} path={path}>
          <Head title={`Thream | ${t("application:guild-settings")}`} />
          <Application path={path} title={t("application:guild-settings")}>
            <GuildSettings />
          </Application>
        </GuildMemberProvider>
      </GuildsProvider>
    </AuthenticationProvider>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true,
  fetchData: async (context, api) => {
    const guildId = Number(context?.params?.["guildId"])
    if (Number.isNaN(guildId)) {
      return {
        notFound: true,
      }
    }
    const { data: guildMember } = await api.get<GuildMember>(
      `/guilds/${guildId}`,
    )
    return {
      guildId,
      guildMember,
    }
  },
})

export default GuildSettingsPage
