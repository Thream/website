import { useMemo } from 'react'
import Link from 'next/link'
import htmlParser from 'html-react-parser'

import { ReactHTMLProps } from 'typings/utils'
import { Button } from 'components/design/Button'
import { AuthenticationForm } from './AuthenticationForm'

type AuthenticationLayoutProps = ReactHTMLProps<HTMLDivElement> & {
  isReversed?: boolean
  layoutContent: {
    buttonText: string
    description: string
    title: string
  }
}

export const AuthenticationLayout: React.FC<AuthenticationLayoutProps> = props => {
  const { isReversed, layoutContent, ...rest } = props
  const { title, description, buttonText } = layoutContent

  const svgType = useMemo(() => (isReversed != null ? '-reverse' : ''), [
    isReversed
  ])
  const formPosition = useMemo(() => (isReversed != null ? 'center' : 'end'), [
    isReversed
  ])
  const svgPositionLeftToRight = useMemo(
    () => (isReversed != null ? 'right' : 'left'),
    [isReversed]
  )
  const svgPositionRightToLeft = useMemo(
    () => (isReversed != null ? 'left' : 'right'),
    [isReversed]
  )

  return (
    <>
      <div className='AuthenticationLayout' {...rest}>
        <div className='AuthenticationLayout__svg'>
          <img
            className='blue-dot'
            src={`/images/svg/authentication/blue-dot${svgType}.svg`}
            alt='Blue dot '
          />
          <img
            className='rectangles'
            src={`/images/svg/authentication/rectangles${svgType}.svg`}
            alt='Rectangles '
          />
          <img
            className='half-circle'
            src={`/images/svg/authentication/half-circle${svgType}.svg`}
            alt='Half cercle'
          />
        </div>

        <div className='layoutContainer'>
          <div className='Authentication__form-container'>
            <AuthenticationForm isSignup={isReversed} />
          </div>

          <aside className='AuthenticationLayout__aside'>
            <div className='Authentication__aside-background'>
              <img
                src={`/images/svg/authentication/aside-background${svgType}.svg`}
                alt='Authentication aside background'
              />
            </div>

            <div className='AuthenticationLayout__content'>
              <Link href='/'>
                <a>
                  <div className='thream'>
                    <img src='/images/svg/thream-logo.svg' alt='Thream logo' />
                  </div>
                </a>
              </Link>
              <div className='container'>
                <h2 className='AuthenticationLayout__title'>
                  {htmlParser(title)}
                </h2>
                <p className='AuthenticationLayout__description'>
                  {htmlParser(description)}
                </p>
              </div>
              <Button>{buttonText}</Button>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>
        {`
          .AuthenticationLayout {
            position: relative;
            background: #fff;
            height: 100vh;
          }

          .AuthenticationLayout__svg {
            position: relative;
            z-index: 1;
          }

          .AuthenticationLayout__svg img {
            position: fixed;
          }

          .blue-dot {
            ${svgPositionLeftToRight}: 1rem;
            top: 1.8rem;
          }

          .rectangles {
            ${svgPositionLeftToRight}: 0;
            top: 24.5rem;
          }

          .half-circle {
            ${svgPositionLeftToRight}: 0;
            bottom: 0;
          }

          .layoutContainer {
            display: flex;
            align-items: center;
            justify-content: ${formPosition};
          }
          .Authentication__form-container {
            order: 2;
            padding: 2rem 0;
            position: relative;
            z-index: 2;
          }
          .AuthenticationLayout__aside {
            order: 1;
            width: 30%;
            height: 100vh;
          }

          .Authentication__aside-background {
            right: 0;
            position: relative;
            height: 100%;
          }
          .Authentication__aside-background img {
            height: 100vh;
            position: fixed;
            ${svgPositionRightToLeft} : -7px;
            overflow: hidden;
          }
          .AuthenticationLayout__content {
            position: absolute;
            top: 0;
            ${svgPositionRightToLeft} : 20px;
            text-align: ${svgPositionRightToLeft};
          }
          .AuthenticationLayout__title {
            color: #fff;
            font-size: 3.2rem;
          }
          .AuthenticationLayout__description {
            color: var(--color-grey-light-2);
            font-weight: 200;
            margin: 4rem 0;
            font-size: 2rem;
            line-height: 1.3;
          }
          .thream {
            width: 100%;
            height: 8rem;
          }
          .thream img {
            top: 15px;
            width: 53px;
            position: absolute;
            ${svgPositionRightToLeft} : -4px;
          }

          @media only screen and (max-width: 1150px) {
            .layoutContainer {
              position: relative;
              z-index: 1;
            }
            .layoutContainer {
              flex-direction: column;
              align-items: center;
            }
            .AuthenticationLayout__aside {
              display: flex;
              align-items: center;
              justify-content: space-between;
              position: static;
              width: 100%;
              bottom: 0;
              height: auto;
            }
            .Authentication__aside-background {
              display: none;
            }
            .Authentication__form-container {
              align-items: start;
              padding-top: 7rem;
              padding-left: 0;
              min-width: 33rem;
              order: 1;
            }

            .AuthenticationLayout__content {
              background: linear-gradient(
                165.58deg,
                var(--color-grey-light-5) 8.4%,
                var(--color-secondary-dark) 99.52%
              );
              position: static;
              width: 100%;
              padding: 2.5rem 1rem;
              text-align: left;
              top: unset;
              bottom: 0;
              left: 0;
              right: 0;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .AuthenticationLayout__description {
              margin: 1rem 0;
              font-size: 1.2rem;
              padding: 0 2rem;
            }
            .AuthenticationLayout__title {
              font-size: 2rem;
              font-weight: 500;
              padding: 0 2rem;
              margin: 0;
            }
            .half-circle {
              bottom: 1.7rem;
            }
            .thream {
              display: none;
            }
          }

          @media (min-height: 1366px) and (min-width: 1024px) {
            .Authentication__aside-background img {
              width: 52%;
            }
          }
          @media only screen and (max-width: 600px) {
            .Authentication__form-container {
              width: 33rem;
            }
          }
        `}
      </style>
    </>
  )
}
