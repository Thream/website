import { IconButton } from 'components/design/IconButton'
import { RadioInput } from 'components/design/RadioInput'
import { Switch } from 'components/design/Switch'
import { Tooltip } from 'components/design/Tooltip'
import Head from 'components/Head'
import { useState } from 'react'

const Home: React.FC = () => {
  const [checkedValue, setCheckedVaue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedVaue(event.target.value)
  }

  return (
    <p>
      <p>Hello Thream! 👋</p>

      <Head />
      <RadioInput
        id='1'
        handleChange={handleChange}
        checked={checkedValue === 'Momo'}
        label='Momo'
        value='Momo'
      />

      <RadioInput
        id='2'
        handleChange={handleChange}
        checked={checkedValue === 'Divlo'}
        label='Divlo'
        value='Divlo'
      />

      <Switch checked={false} />
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
    </p>
  )
}

export default Home
