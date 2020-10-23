import { Button } from 'components/design/Button'
import { Input } from 'components/design/Input'
import Head from 'components/Head'

const Home: React.FC = () => {
  return (
    <>
      <Head />

      <p>Hello Thream! 👋</p>
      <Button>Salut</Button>
      <br />
      <br />
      <Button type='disabled'>Salut</Button>
      <br />
      <br />
      <Button type='large'>Salut</Button>
      <br />
      <br />
      <Button socialMediaType='discord'>Discord</Button>
      <br />
      <Button socialMediaType='twitter'>Twitter</Button>
      <br />
      <Button socialMediaType='google'>Google</Button>
      <br />
      <Button socialMediaType='github'>GitHub</Button>
      <Input label='Name' name='name' type='text' />
      <Input label='Password' name='password' type='password' state='togglePassword' />

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
