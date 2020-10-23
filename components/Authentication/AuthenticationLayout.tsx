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
        <div className='AuthenticationLayout__background'>
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

        <AuthenticationForm isSignup={isReversed} />

        <aside className='AuthenticationLayout__aside'>
          <img
            src={`/images/svg/authentication/aside-background${svgType}.svg`}
            alt='Authentication background'
          />
          <Link href='/'>
            <a>
              <div className='thream'>
                <img src='/images/svg/thream-logo.svg' alt='Thream logo' />
              </div>
            </a>
          </Link>

          <div className='AuthenticationLayout__content'>
            <h2 className='AuthenticationLayout__title'>{title}</h2>
            <p className='AuthenticationLayout__description'>
              {htmlParser(description)}
            </p>

            <Button>{buttonText}</Button>
          </div>
        </aside>
      </div>

      <style jsx>
        {`
          .AuthenticationLayout {
            position: relative;
          }

          .AuthenticationLayout__background {
            position: relative;
            background: #fff;
            height: 100vh;
            top: 0;
            left: 0;
          }

          img {
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
          .AuthenticationLayout__aside {
            position: absolute;
            ${svgPositionRightToLeft}: 0;
            top: 0;
            width: 30vw;
            height: 100vh;
            z-index: 1;
            overflow: hidden;
          }

          .AuthenticationLayout__aside img {
            height: 100%;
            ${svgPositionRightToLeft}: -15px;
            top: 0;
            bottom: 0;
          }

          .AuthenticationLayout__content {
            position: fixed;
            top: 14rem;
            ${svgPositionRightToLeft}: 3rem;
            text-align: ${svgPositionRightToLeft};
            padding: 5rem 0 0 0;
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
            position: relative;
            width: 100%;
            height: 8rem;
            ${svgPositionRightToLeft}: 3rem;
          }
          .thream img {
            top: 10px;
            position: absolute;
          }
        `}
      </style>
    </>
  )
}
