import type { GetStaticProps, NextPage } from "next"
import Link from "next/link"
import Image from "next/image"
import Translation from "next-translate/Trans"
import useTranslation from "next-translate/useTranslation"

import { Head } from "../components/Head"
import { Header } from "../components/Header"
import { Main } from "../components/design/Main"
import type { FooterProps } from "../components/Footer"
import { Footer } from "../components/Footer"
import { SocialMediaLink } from "../components/design/SocialMediaButton"
import { ButtonLink } from "../components/design/Button"

const Home: NextPage<FooterProps> = (props) => {
  const { t } = useTranslation()
  const { version } = props

  return (
    <>
      <Head />
      <Header />
      <Main>
        <div className="flex w-4/5 flex-col items-center">
          <div className="max-w-xs">
            <Link href="/authentication/signup">
              <Image
                quality={100}
                width={351}
                height={341}
                src="/images/svg/design/home.svg"
                alt={"Thream's chat app"}
                priority
              />
            </Link>
          </div>
          <div className="text-center">
            <h1 className="my-4 font-headline text-3xl font-medium text-green-800 dark:text-green-400">
              Thream
            </h1>
            <div
              className="max-w-lg font-paragraph text-lg"
              data-cy="main-description"
            >
              <Translation
                i18nKey="home:description"
                components={[
                  <strong
                    className="font-bold text-green-800 dark:text-green-400"
                    key="bold"
                  />,
                ]}
              />
            </div>
            <div className="mt-8 flex items-center justify-center space-x-4 text-center">
              <Link href="/authentication/signup" passHref legacyBehavior>
                <ButtonLink data-cy="get-started">
                  {t("home:get-started")}
                </ButtonLink>
              </Link>

              <SocialMediaLink
                socialMedia="GitHub"
                href="https://github.com/Thream"
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
          </div>
        </div>
      </Main>
      <Footer version={version} />
    </>
  )
}

export const getStaticProps: GetStaticProps<FooterProps> = async () => {
  const { readPackage } = await import("read-pkg")
  const { version } = await readPackage()
  return { props: { version } }
}

export default Home
