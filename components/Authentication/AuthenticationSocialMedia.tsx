import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { api } from '../../tools/api'
import { Authentication, isTokens } from '../../tools/authentication'
import { SocialMediaButton, SocialMedia } from '../design/SocialMediaButton'

export const AuthenticationSocialMedia: React.FC = () => {
  const router = useRouter()

  const handleAuthentication = (
    socialMedia: SocialMedia
  ): (() => Promise<void>) => {
    return async () => {
      const redirect = window.location.href
      const { data: url } = await api.get(
        `/users/oauth2/${socialMedia.toLowerCase()}/signin?redirectURI=${redirect}`
      )
      window.location.href = url
    }
  }

  useEffect(() => {
    const data = router.query
    if (isTokens(data)) {
      const authentication = new Authentication(data)
      authentication.signin()
      router.push('/application').catch(() => {})
    }
  }, [router])

  return (
    <div className='flex flex-col sm:w-full sm:items-center'>
      <div className='flex flex-col items-center justify-center space-y-6 sm:w-4/6 sm:flex-row sm:space-x-6 sm:space-y-0'>
        <SocialMediaButton
          socialMedia='Google'
          onClick={handleAuthentication('Google')}
        />
        <SocialMediaButton
          socialMedia='GitHub'
          onClick={handleAuthentication('GitHub')}
        />
        <SocialMediaButton
          socialMedia='Discord'
          onClick={handleAuthentication('Discord')}
        />
      </div>
    </div>
  )
}
