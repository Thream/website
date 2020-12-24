import '@fontsource/montserrat/400.css'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'

import 'normalize.css/normalize.css'

import { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Component {...pageProps} />

      <style jsx global>
        {`
          :root {
            --default-font-family: 'Roboto';
            --default-font-size: 1.6rem;

            --color-text: rgb(222, 222, 222);

            --color-primary-1: #060c24;
            --color-primary-2: #1e2337;
            --color-primary-3: #262b3f;
            --color-primary-4: #333951;

            --color-secondary: #429d89;

            --color-grey-light-1: #f1f1f1;
            --color-grey-light-2: #dcdcdc;
            --color-grey-light-3: #c1c1c1;
            --color-grey-light-4: #9d9d9d;
            --color-grey-light-5: #3e3e3e;

            --color-grey-dark-1: #757575;
            --color-grey-dark-2: #999;
            --color-grey-dark-3: #575757;

            --color-success: #90e059;
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
            background-color: var(--color-primary-1);
            color: var(--color-text);
            font-size: var(--default-font-size);
            font-family: var(--default-font-family);
            font-weight: 400;
          }
          a {
            color: var(--color-grey-light-3);
          }
        `}
      </style>
    </>
  )
}

export default App
