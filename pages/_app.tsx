import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'

import 'normalize.css/normalize.css'

import { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Component {...pageProps} />

      <style jsx global>
        {`
          :root {
            --default-font-size: 1.6rem;
            --color-background-primary: #212121;
            --color-background-secondary: #292D3E;
            --color-primary: #27b05e;
            --color-secondary: #fff;
            --color-tertiary: #7c818f;
            --color-success: #27b05e;
            --color-error: #ee1b1b;
          }
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
          #__next {
            min-height: 100vh;
          }
          html {
            font-size: 62.5%; /* 1 rem = 10px; 10px/16px = 62.5% */
          }
          body {
            display: flex;
            flex-flow: column wrap;
            background-color: var(--color-background-primary);
            color: var(--color-secondary);
            font-size: var(--default-font-size);
            font-family: 'Poppins', 'Arial', 'sans-serif';
            font-weight: 400;
          }
          a {
            color: var(--color-primary);
          }
        `}
      </style>
    </>
  )
}

export default App
