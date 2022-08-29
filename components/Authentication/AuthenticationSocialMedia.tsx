import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { api } from '../../tools/api'
import { Authentication, isTokens } from '../../tools/authentication'
import { SocialMediaButton, SocialMedia } from '../design/SocialMediaButton'
import { providers } from '../../models/OAuth'

export const AuthenticationSocialMedia: React.FC = () => {
  const router = useRouter()

  const handleAuthentication = (
    socialMedia: SocialMedia
  ): (() => Promise<void>) => {
    return async () => {
      const redirect = window.location.href.replace(location.search, '')
      const { data: url } = await api.get(
        `/users/oauth2/${socialMedia.toLowerCase()}/signin?redirectURI=${redirect}`
      )
      window.location.href = url
    }
  }

  useEffect(() => {
    const data = router.query
    if (isTokens(data)) {
      const authentication = new Authentication(data, true)
      authentication.signin()
      router.push('/application').catch(() => {})
    }
  }, [router])

  return (
    <div className='flex flex-col sm:w-full sm:items-center'>
      <div className='flex flex-col items-center justify-center space-y-6 sm:w-4/6 sm:flex-row sm:space-x-6 sm:space-y-0'>
        {providers.map((provider, index) => {
          return (
            <SocialMediaButton
              key={index}
              socialMedia={provider}
              onClick={handleAuthentication(provider)}
            />
          )
        })}
      </div>
    </div>
  )
}
