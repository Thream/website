import { GetStaticProps } from 'next'

import { Head } from 'components/Head'
import { Application } from 'components/Application'

const SettingsPage: React.FC = () => {
  return (
    <>
      <Head title='Thream | Settings' />
      <Application path='/application/settings'>
        <p>Settings</p>
      </Application>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default SettingsPage
