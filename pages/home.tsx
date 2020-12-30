import Head from 'components/Head'
import Form from 'react-component-form'
import { Input } from 'components/design/Input'
import { Button } from 'components/design/Button'
import { Switch } from 'components/design/Switch'

const Home: React.FC = () => {
  return (
    <>
      <Head />

      <p>Hello Thream! 👋</p>

      <Switch checked />
      <Switch />

      <div>
        <Form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Input label='Name' />
          <Input label='Email' state='error' />
          <Input label='Password' state='success' />
          <Input label='Password' type='password' state='togglePassword' />

          <Button style={{ width: 200 }} type='submit'>
            Submit
          </Button>
        </Form>
      </div>

      <style jsx>
        {`
          p {
            margin-left: 15px;
          }
          div {
            display: flex;
            justify-content: center;
          }
        `}
      </style>
    </>
  )
}

export default Home
