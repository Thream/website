import { Head } from 'components/Head'
import { authenticationFromServerSide } from 'utils/authentication'
import { Application, ApplicationProps } from 'components/Application'

const ApplicationPage: React.FC<ApplicationProps> = (props) => {
  return (
    <>
      <Head title='Thream | Application' />
      <Application authentication={props.authentication} guilds={props.guilds}>
        <p>Main Content</p>
      </Application>
    </>
  )
}

export const getServerSideProps = authenticationFromServerSide({
  shouldBeAuthenticated: true,
  fetchData: async (api) => {
    const { data } = await api.get('/guilds')
    return { guilds: data }
  }
})

export default ApplicationPage
