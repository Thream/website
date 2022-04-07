import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import useTranslation from 'next-translate/useTranslation'

import '../styles/global.css'

import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

import { cookies } from '../tools/cookies'

const Application = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { lang } = useTranslation()

  useEffect(() => {
    cookies.set('NEXT_LOCALE', lang)
    const appHeight = (): void => {
      document.documentElement.style.setProperty(
        '--app-height',
        `${window.innerHeight}px`
      )
    }
    window.addEventListener('resize', appHeight)
    appHeight()
  }, [lang])

  return (
    <ThemeProvider attribute='class' defaultTheme='dark'>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default Application
