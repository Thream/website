import Link from 'next/link'

import { Button } from 'components/design/Button'
import { SocialMediaButton } from 'components/design/SocialMediaButton'
import Head from 'components/Head'
import { Header } from 'components/Header'

const Home: React.FC = () => {
  return (
    <>
      <Head />

      <Header />
      <div className='container'>
        <section id='about'>
          <div>
            <img
              className='app__image'
              src='/images/home/home.svg'
              alt="Thream's chat app"
            />
          </div>
          <div>
            <h1 className='title'>Thream</h1>
            <div className='paragraph'>
              Your <strong>open source</strong> platform to stay close with your friends and communities, <strong>talk</strong>, chat, <strong>collaborate</strong>, share and <strong>have fun</strong>.
              <div className='buttons'>
                <Link href='/users/signup'>
                  <a>
                    <Button style={{ margin: '0 10px 0 0' }}>Get started</Button>
                  </a>
                </Link>
                <a
                  href='https://github.com/Thream'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='github-link'
                >
                  <SocialMediaButton socialMedia='GitHub' />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>
        {`
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 50px;
          }
          #about {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 740px;
          }
          .app__image {
            width: 200px;
            height: 200px;
            margin-right: 25px;
          }
          .title {
            font-weight: 400;
          }
          .paragraph {
            font-family: 'Roboto', 'sans-serif';
            font-size: 18px;
            font-weight: 400;
            line-height: 32px;
          }
          strong {
            font-weight: 700;
            color: var(--color-primary);
          }
          .buttons {
            text-align: center;
            margin-top: 20px;
          }
          .github-link {
            text-decoration: none;
          }
          @media (max-width: 600px) {
            .container {
              height: calc(100vh - 110px);
              margin-bottom: 20px;
              margin-top: 0;
            }
            .app__image {
              width: 100%;
            }
            #about {
              flex-direction: column;
              text-align: center;
              width: 80%;
            }
          }
        `}
      </style>
    </>
  )
}

export default Home
