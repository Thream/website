import { useRouter } from 'next/router'

import {
  SocialMediaButton,
  SocialMedia
} from 'components/design/SocialMediaButton'
import { api } from 'utils/api'
import { Authentication, Tokens } from 'utils/authentication'
import { useEffect } from 'react'

const isTokens = (data: { [key: string]: any }): data is Tokens => {
  return (
    'accessToken' in data &&
    'refreshToken' in data &&
    'type' in data &&
    'expiresIn' in data
  )
}

export const AuthenticationSocialMedia: React.FC = () => {
  const router = useRouter()

  const handleAuthentication = async (
    socialMedia: SocialMedia
  ): Promise<void> => {
    const redirect = window.location.href
    const { data: url } = await api.get(
      `/users/oauth2/${socialMedia.toLowerCase()}/signin?redirectURI=${redirect}`
    )
    window.location.href = url
  }

  useEffect(() => {
    const data = router.query
    if (isTokens(data)) {
      const authentication = new Authentication(data)
      authentication.signin()
      router.push('/application').catch(() => {})
    }
  }, [router.query])

  return (
    <>
      <div className='social-container'>
        <div className='social-buttons'>
          <SocialMediaButton
            onClick={async () => await handleAuthentication('Google')}
            className='social-button'
            socialMedia='Google'
          />
          <SocialMediaButton
            onClick={async () => await handleAuthentication('GitHub')}
            className='social-button'
            socialMedia='GitHub'
          />
          <SocialMediaButton
            onClick={async () => await handleAuthentication('Discord')}
            className='social-button'
            socialMedia='Discord'
          />
        </div>
      </div>

      <style jsx>
        {`
          @media (max-width: 600px) {
            :global(.social-button) {
              margin-top: 15px !important;
            }
            .social-container {
              margin-top: 20px !important;
            }
            .social-buttons {
              height: 100% !important;
            }
          }
          .social-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
          }
          .social-buttons {
            display: flex;
            justify-content: space-evenly;
            width: 60%;
          }
          @media (max-width: 970px) {
            .social-buttons {
              width: 80%;
            }
          }
          @media (max-width: 770px) {
            .social-buttons {
              width: 100%;
            }
          }
          @media (max-width: 600px) {
            .social-buttons {
              flex-direction: column;
              align-items: center;
              height: 30%;
            }
          }
        `}
      </style>
    </>
  )
}
