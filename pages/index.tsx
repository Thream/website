import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import Translation from 'next-translate/Trans'
import useTranslation from 'next-translate/useTranslation'

import { Head } from 'components/Head'
import { Header } from 'components/Header'
import { Main } from 'components/design/Main'
import { Footer, FooterProps } from 'components/Footer'
import { SocialMediaButton } from 'components/design/SocialMediaButton'
import { Button } from 'components/design/Button'
import { ScrollableBody } from 'components/ScrollableBody'

const Home: NextPage<FooterProps> = (props) => {
  const { t } = useTranslation()
  const { version } = props

  return (
    <ScrollableBody>
      <Head />
      <Header />
      <Main>
        <section className='flex flex-col items-center w-4/5'>
          <section className='max-w-xs'>
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
          </section>
          <section className='text-center'>
            <h1 className='my-4 text-3xl font-medium font-headline text-green-800 dark:text-green-400'>
              Thream
            </h1>
            <div
              className='font-paragraph text-lg max-w-lg'
              data-cy='main-description'
            >
              <Translation
                i18nKey='home:description'
                components={[
                  <strong
                    className='text-green-800 dark:text-green-400 font-bold'
                    key='bold'
                  />
                ]}
              />
            </div>
            <div className='flex justify-center items-center text-center mt-8 space-x-4'>
              <Link href='/authentication/signup'>
                <a data-cy='get-started'>
                  <Button>{t('home:get-started')}</Button>
                </a>
              </Link>
              <a
                href='https://github.com/Thream'
                target='_blank'
                rel='noopener noreferrer'
              >
                <SocialMediaButton socialMedia='GitHub' />
              </a>
            </div>
          </section>
        </section>
      </Main>
      <Footer version={version} />
    </ScrollableBody>
  )
}

export const getStaticProps: GetStaticProps<FooterProps> = async () => {
  const { readPackage } = await import('read-pkg')
  const { version } = await readPackage()
  return { props: { version } }
}

export default Home
