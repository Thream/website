import { IconButton } from 'components/design/IconButton'
import { Tooltip } from 'components/design/Tooltip'
import Head from 'components/Head'

const Home: React.FC = () => {
  return (
    <>
      <Head />

      <p>Hello Thream! 👋</p>

      <br />
      <br />

      <IconButton name='add' hasBackground />
      <br />
      <br />
      <IconButton name='settings' hasBackground />
      <br />
      <br />
      <IconButton name='emoji' hasBackground />
      <br />
      <br />

      <Tooltip content='edit'>
        <IconButton name='edit' />
      </Tooltip>

      <br />
      <br />
      <br />
      <br />
      <Tooltip content='delete'>
        <IconButton name='delete' />
      </Tooltip>

      <br />
      <br />
      <br />
      <br />
      <Tooltip content='send'>
        <IconButton name='send' />
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
