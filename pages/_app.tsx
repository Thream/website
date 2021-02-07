import '@fontsource/poppins/400.css'
import '@fontsource/poppins/700.css'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

import 'normalize.css/normalize.css'

import { AppProps } from 'next/app'

import { ThemeProvider } from 'contexts/Theme'

const ThreamApp = ({ Component, pageProps }: AppProps): JSX.Element => {
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
            --color-primary: #27b05e;
            --color-secondary: #fff;
            --color-tertiary: #7c818f;
            --color-success: #90ee90;
            --color-error: #ff7f7f;
            &.theme-dark {
              --color-background-primary: #212121;
              --color-secondary: #fff;
              --color-success: #90ee90;
              --color-error: #ff7f7f;
            }
            &.theme-light {
              --color-background-primary: #fff;
              --color-secondary: #181818;
              --color-success: #1e4620;
              --color-error: #ee1b1b;
            }
            display: flex;
            flex-flow: column wrap;
            background-color: var(--color-background-primary);
            color: var(--color-secondary);
            font-size: var(--default-font-size);
            font-family: 'Poppins', 'Arial', 'sans-serif';
            font-weight: 400;
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
        `}
      </style>
    </>
  )
}

export default ThreamApp
