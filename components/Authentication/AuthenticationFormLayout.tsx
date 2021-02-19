import Form, { HandleForm } from 'react-component-form'

import { Button } from 'components/design/Button'
import useTranslation from 'next-translate/useTranslation'

export interface AuthenticationFormLayoutProps {
  onChange?: HandleForm
  onSubmit?: HandleForm
  link?: React.ReactNode
}

export const AuthenticationFormLayout: React.FC<AuthenticationFormLayoutProps> = (
  props
) => {
  const { children, onChange, onSubmit, link } = props
  const { t } = useTranslation()

  return (
    <>
      <Form onChange={onChange} onSubmit={onSubmit}>
        <div className='form-container'>
          <div className='form'>
            {children}
            <Button style={{ width: '100%' }} type='submit'>
              {t('authentication:submit')}
            </Button>
            {link}
          </div>
        </div>
      </Form>

      <style jsx>
        {`
          @media (max-width: 330px) {
            .form {
              width: auto !important;
            }
          }
          .form {
            flex-shrink: 0;
            width: 310px;
          }
          .form-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
          }
        `}
      </style>
    </>
  )
}
