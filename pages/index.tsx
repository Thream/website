import { IconButton } from 'components/design/IconButton'
import { Tooltip } from 'components/design/Tooltip'
import Head from 'components/Head'

const Home: React.FC = () => {
  return (
    <>
      <Head />

      <p>Hello Thream! 👋</p>

      <IconButton iconName='add' hasBackground />
      <br />
      <br />
      <IconButton iconName='settings' hasBackground />
      <br />
      <br />
      <IconButton iconName='emoji' hasBackground />
      <br />
      <br />

      <Tooltip content='edit'>
        <IconButton iconName='edit' />
      </Tooltip>

      <br />
      <br />
      <br />
      <br />
      <Tooltip content='delete'>
        <IconButton iconName='delete' />
      </Tooltip>

      <br />
      <br />
      <br />
      <br />
      <Tooltip content='send'>
        <IconButton iconName='send' />
      </Tooltip>

      <br />

      <style jsx>
        {`
          p {
            margin-left: 15px;
          }
        `}
      </style>
    </>
  )
}

export default Home
