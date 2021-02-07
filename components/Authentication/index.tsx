import { Divider } from 'components/design/Divider'
import { Header } from 'components/Header'
import { AuthenticationForm } from 'components/Authentication/AuthenticationForm'
import { AuthenticationSocialMedia } from 'components/Authentication/AuthenticationSocialMedia'
import { Container } from 'components/design/Container'
import { HandleSubmitCallback } from 'hooks/useForm'

export interface AuthenticationProps {
  mode: 'signup' | 'signin'
  onSubmit: HandleSubmitCallback
}

export const Authentication: React.FC<AuthenticationProps> = (props) => {
  const { mode, onSubmit } = props

  return (
    <>
      <Header />
      <Container>
        <AuthenticationSocialMedia />
        <div className='divider'>
          <Divider content='OR' />
        </div>
        <AuthenticationForm onSubmit={onSubmit} mode={mode} />
      </Container>

      <style jsx>
        {`
          @media (max-width: 600px) {
            .divider {
              margin: 20px 0 !important;
            }
          }
          .divider {
            margin: 40px 0;
          }
        `}
      </style>
    </>
  )
}
