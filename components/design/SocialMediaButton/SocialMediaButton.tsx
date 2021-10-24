import { useMemo } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

export type SocialMedia = 'Discord' | 'GitHub' | 'Google'

type SocialMediaColors = {
  [key in SocialMedia]: string
}

export interface SocialMediaButtonProps
  extends React.ComponentPropsWithRef<'button'> {
  socialMedia: SocialMedia
}

const socialMediaColors: SocialMediaColors = {
  Discord: '#404EED',
  GitHub: '#24292E',
  Google: '#FCFCFC'
}

export const SocialMediaButton: React.FC<SocialMediaButtonProps> = (props) => {
  const { socialMedia, className, ...rest } = props

  const socialMediaColor = useMemo(() => {
    return socialMediaColors[socialMedia]
  }, [socialMedia])

  return (
    <>
      <button
        data-testid='button'
        {...rest}
        className={classNames(
          `button py-2 px-6 inline-flex outline-none items-center font-paragraph rounded-lg cursor-pointer transition duration-300 ease-in-out hover:opacity-80 focus:outline-none`,
          className
        )}
      >
        <Image
          width={20}
          height={20}
          src={`/images/svg/web/${socialMedia}.svg`}
          alt={socialMedia}
        />
        <span className='ml-2'>{socialMedia}</span>
      </button>

      <style jsx>
        {`
          .button {
            background: ${socialMediaColor};
            color: ${socialMedia === 'Google' ? '#000' : '#fff'};
            border: ${socialMedia === 'Google' ? '1px solid #000' : 'none'};
          }
          .button:focus {
            box-shadow: 0 0 0 2px #27b05e;
          }
        `}
      </style>
    </>
  )
}
