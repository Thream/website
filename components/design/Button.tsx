import { forwardRef, useMemo } from 'react'

import { ReactHTMLProps } from 'typings/utils'

type OAuthProviders = 'discord' | 'github' | 'google'

type SocialMediaColors = {
  [key in OAuthProviders]: string
}

type ButtonProps = ReactHTMLProps<HTMLButtonElement> & {
  type?: 'disabled' | 'large'
  socialMediaType?: OAuthProviders
}

const socialMediaColors: SocialMediaColors = {
  discord: '#7289DA',
  github: '#24292E',
  google: '#FCFCFC'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, socialMediaType, type, ...rest } = props

    const buttonClassList = useMemo(() => {
      const classList = ['btn']

      if (type != null) {
        classList.push(`btn--${type}`)
      }

      if (socialMediaType != null) {
        classList.push('btn--social')
        if (socialMediaType !== 'google') {
          classList.push('color-white')
        }
      }

      return classList.join(' ')
    }, [socialMediaType, type])

    return (
      <>
        <button ref={ref} {...rest} className={buttonClassList}>
          {socialMediaType != null && (
            <img
              src={`/images/svg/social-media/${socialMediaType}.svg`}
              alt={socialMediaType}
            />
          )}
          <span>{children}</span>
        </button>

        <style jsx>
          {`
            .btn,
            .btn:link,
            .btn:visited {
              position: relative;
              z-index: 1;
              cursor: pointer;
              font-size: var(--default-font-size);
              font-weight: 400;
              letter-spacing: 0.8px;
              padding: 1.3rem 3.3rem;
              border: none;
              border-radius: 4px;
              transition: 0.2s;
              color: #fff;
              background: var(--color-secondary);
            }
            .btn:hover {
              transform: translateY(-3px);
              box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
              background: var(--color-primary-1);
              border: 1px solid #fff;
              transition: all 0.3s ease-in;
            }

            .btn:active,
            .btn:focus {
              outline: 2px;
              transform: translateY(-1px);
              box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
            }

            .btn--disabled {
              cursor: not-allowed;
            }
            .btn--disabled:hover {
              background: var(--color-secondary);
              border: none;
            }

            .btn--large {
              width: 100%;
            }
            .btn--social:before {
              display: none;
            }
            .btn--social img,
            .btn--social span {
              display: inline-block;
              font-weight: 500;
            }

            .btn--social img {
              width: 2rem;
              margin-right: 0.7rem;
            }
            .btn--social {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 144px;
            }

            .color-white {
              color: #fff;
            }

            .btn--social {
              background: ${socialMediaColors[socialMediaType ?? 'google']};
            }
          `}
        </style>
      </>
    )
  }
)
