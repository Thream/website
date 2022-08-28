import { useMemo } from 'react'
import Image from 'next/image'
import classNames from 'clsx'

import { ProviderOAuth } from '../../../models/OAuth'

export type SocialMedia = ProviderOAuth

type SocialMediaColors = {
  [key in SocialMedia]: string
}

const socialMediaColors: SocialMediaColors = {
  Discord: '#404EED',
  GitHub: '#24292E',
  Google: '#FCFCFC'
}

const className =
  'py-2 px-6 inline-flex outline-none items-center font-paragraph rounded-lg cursor-pointer transition duration-300 ease-in-out hover:opacity-80 focus:outline-none'

interface SocialMediaChildrenProps {
  socialMedia: SocialMedia
}

const SocialMediaChildren: React.FC<SocialMediaChildrenProps> = (props) => {
  const { socialMedia } = props

  return (
    <>
      <Image
        quality={100}
        width={20}
        height={20}
        src={`/images/svg/web/${socialMedia}.svg`}
        alt={socialMedia}
      />
      <span className='ml-2'>{socialMedia}</span>
    </>
  )
}

export interface SocialMediaButtonProps
  extends React.ComponentPropsWithRef<'button'>,
    SocialMediaChildrenProps {}

export const SocialMediaButton: React.FC<SocialMediaButtonProps> = (props) => {
  const { socialMedia, className: givenClassName, ...rest } = props

  const socialMediaColor = useMemo(() => {
    return socialMediaColors[socialMedia]
  }, [socialMedia])

  return (
    <>
      <button
        {...rest}
        className={classNames(className, 'button', givenClassName)}
      >
        <SocialMediaChildren socialMedia={socialMedia} />
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

export interface SocialMediaLinkProps
  extends React.ComponentPropsWithRef<'a'>,
    SocialMediaChildrenProps {}

export const SocialMediaLink: React.FC<SocialMediaLinkProps> = (props) => {
  const { socialMedia, className: givenClassName, ...rest } = props

  const socialMediaColor = useMemo(() => {
    return socialMediaColors[socialMedia]
  }, [socialMedia])

  return (
    <>
      <a {...rest} className={classNames(className, 'link', givenClassName)}>
        <SocialMediaChildren socialMedia={socialMedia} />
      </a>

      <style jsx>
        {`
          .link {
            background: ${socialMediaColor};
            color: ${socialMedia === 'Google' ? '#000' : '#fff'};
            border: ${socialMedia === 'Google' ? '1px solid #000' : 'none'};
          }
          .link:focus {
            box-shadow: 0 0 0 2px #27b05e;
          }
        `}
      </style>
    </>
  )
}
