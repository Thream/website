import { GetServerSideProps } from 'next'

import { Head } from 'components/Head'
import { Application } from 'components/Application'
import { Messages } from 'components/Application/Messages'

export interface ChannelPageProps {
  channelId: number
  guildId: number
}

const ChannelPage: React.FC<ChannelPageProps> = (props) => {
  const { channelId, guildId } = props

  return (
    <>
      <Head title='Thream | Application' />
      <Application
        path={{
          channelId,
          guildId
        }}
      >
        <Messages />
      </Application>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<
  {},
  {
    channelId: string
    guildId: string
  }
> = async (context) => {
  const channelId = Number(context?.params?.channelId)
  const guildId = Number(context?.params?.guildId)
  if (isNaN(channelId) || isNaN(guildId)) {
    return {
      redirect: {
        destination: '/application',
        permanent: false
      }
    }
  }
  return {
    props: { channelId, guildId }
  }
}

export default ChannelPage
