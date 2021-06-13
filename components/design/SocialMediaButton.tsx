import { forwardRef, useMemo } from 'react'
import Image from 'next/image'

export type SocialMedia = 'Discord' | 'GitHub' | 'Google'

type SocialMediaColors = {
  [key in SocialMedia]: string
}

interface SocialMediaButtonProps extends React.ComponentPropsWithRef<'button'> {
  socialMedia: SocialMedia
}

const socialMediaColors: SocialMediaColors = {
  Discord: '#7289DA',
  GitHub: '#24292E',
  Google: '#FCFCFC'
}

export const SocialMediaButton = forwardRef<
HTMLButtonElement,
SocialMediaButtonProps
>((props, ref) => {
  const { socialMedia, className, ...rest } = props

  const socialMediaColor = useMemo(() => {
    return socialMediaColors[socialMedia]
  }, [socialMedia])

  return (
    <>
      <button
        data-testid='button'
        ref={ref}
        {...rest}
        className={`button ${className ?? ''}`}
      >
        <Image
          width={20}
          height={20}
          src={`/images/svg/web/${socialMedia}.svg`}
          alt={socialMedia}
        />
        <span className='social-media'>{socialMedia}</span>
      </button>

      <style jsx>
        {`
          .button {
            display: inline-flex;
            align-items: center;
            outline: none;
            font-size: var(--default-font-size);
            font-family: 'Roboto', 'Arial', 'sans-serif';
            margin: 0;
            cursor: pointer;
            letter-spacing: 0.8px;
            padding: 0.9rem 2.4rem;
            border: 1px solid transparent;
            border-radius: 10px;
            box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
            background: ${socialMediaColor};
            color: ${socialMedia === 'Google' ? '#000' : '#fff'};
            transition: all 0.3s ease-out;
          }
          .button:hover {
            opacity: 0.85;
            transition: all 0.3s ease-in;
          }
          .button:before {
            display: none;
          }
          .social-media {
            margin-left: 0.7rem;
          }
        `}
      </style>
    </>
  )
})
