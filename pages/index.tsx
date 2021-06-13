import { GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import Translation from 'next-translate/Trans'

import { Head } from 'components/Head'
import { Header } from 'components/Header'
import { Container } from 'components/design/Container'
import { Button } from 'components/design/Button'
import { SocialMediaButton } from 'components/design/SocialMediaButton'

const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head />

      <Header />
      <Container className='home-container'>
        <section id='about'>
          <div className='application__image'>
            <Link href='/authentication/signup'>
              <a>
                <Image
                  width={351}
                  height={341}
                  src='/images/svg/design/home.svg'
                  alt={"Thream's chat app"}
                />
              </a>
            </Link>
          </div>
          <div>
            <h1 className='title'>Thream</h1>
            <div className='paragraph'>
              <Translation
                i18nKey='home:description'
                components={[<strong key='bold' />]}
              />
              <div className='buttons'>
                <Link href='/authentication/signup'>
                  <a className='get-started-link'>
                    <Button>{t('home:get-started')}</Button>
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
      </Container>

      <style jsx global>
        {`
          @media (max-width: 338px) {
            .get-started-link {
              margin: 0 !important;
            }
            .get-started-link > button {
              margin-bottom: 10px !important;
            }
          }
          .home-container {
            align-items: center;
            margin-top: 50px;
            text-align: justify;
            margin-bottom: 20px;
            margin-top: 0;
          }
        `}
      </style>
      <style jsx>
        {`
          #about {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 740px;
            flex-direction: column;
            text-align: center;
            width: 80%;
          }
          .application__image {
            margin-right: 25px;
            max-width: 300px;
          }
          .title {
            font-weight: 400;
          }
          .paragraph {
            font-family: 'Roboto', 'sans-serif';
            font-size: 18px;
            font-weight: 400;
            line-height: 32px;
            max-width: 500px;
          }
          strong {
            font-weight: 700;
            color: var(--color-primary);
          }
          .buttons {
            text-align: center;
            margin-top: 20px;
          }
          .get-started-link {
            margin: 0 10px 0 0;
          }
          .github-link {
            text-decoration: none;
          }
          @media (max-width: 600px) and (max-height: 700px) {
            .application__image:first-child {
              width: 65%;
            }
            .paragraph {
              font-size: 16px;
            }
          }
        `}
      </style>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default Home
