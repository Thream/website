import { useEffect } from 'react'
import { AppProps } from 'next/app'
import useTranslation from 'next-translate/useTranslation'

import { ThemeProvider } from 'contexts/Theme'
import { cookies } from 'utils/cookies'

import '@fontsource/poppins/400.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

import 'normalize.css/normalize.css'

const ThreamApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { lang } = useTranslation()

  useEffect(() => {
    cookies.set('NEXT_LOCALE', lang)
  }, [lang])

  return (
    <>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>

      <style jsx global>
        {`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
          html {
            font-size: 62.5%; /* 1 rem = 10px; 10px/16px = 62.5% */
          }
          body {
            --default-font-size: 1.6rem;
            --color-background-primary: #212121;
            --color-background-secondary: #292d3e;
            --color-background-tertiary: #202331;
            --color-primary: #27b05e;
            --color-secondary: #fff;
            --color-tertiary: #7c818f;
            --color-success: #90ee90;
            --color-error: #ff7f7f;
            --color-shadow: rgba(255, 255, 255, 0.2);
            &.theme-dark {
              --color-background-primary: #212121;
              --color-secondary: #fff;
              --color-success: #90ee90;
              --color-error: #ff7f7f;
              --color-shadow: rgba(255, 255, 255, 0.2);
            }
            &.theme-light {
              --color-background-primary: #fff;
              --color-secondary: #181818;
              --color-success: #1e4620;
              --color-error: #ee1b1b;
              --color-shadow: rgba(0, 0, 0, 0.2);
            }
            display: flex;
            flex-flow: column wrap;
            background-color: var(--color-background-primary);
            color: var(--color-secondary);
            font-size: var(--default-font-size);
            font-family: 'Poppins', 'Arial', 'sans-serif';
            font-weight: 400;
            overflow-y: hidden;
          }
          #__next {
            max-width: 100%;
          }
          a {
            font-family: 'Roboto', 'Arial', 'sans-serif';
            font-size: 14px;
            color: var(--color-primary);
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          ::-webkit-scrollbar {
            width: 0.5rem;
          }
          ::-webkit-scrollbar-track {
            background-color: rgba(36, 38, 45, 0.4);
          }
          ::-webkit-scrollbar-thumb {
            background-color: var(--color-background-secondary);
          }
        `}
      </style>
    </>
  )
}

export default ThreamApp
