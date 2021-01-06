import { forwardRef } from 'react'

type SocialMedia = 'discord' | 'github' | 'google'

type SocialMediaColors = {
  [key in SocialMedia]: string
}

interface SocialMediaButtonProps extends React.ComponentPropsWithRef<'button'> {
  socialMedia: SocialMedia
}

const socialMediaColors: SocialMediaColors = {
  discord: '#7289DA',
  github: '#24292E',
  google: '#FCFCFC'
}

export const SocialMediaButton = forwardRef<
HTMLButtonElement,
SocialMediaButtonProps
>((props, ref) => {
  const { children, socialMedia, ...rest } = props
  return (
    <>
      <button ref={ref} {...rest} className='btn'>
        <img
          src={`/images/svg/social-media/${socialMedia}.svg`}
          alt={socialMedia}
        />
        <span>{children}</span>
      </button>

      <style jsx>{`
        .btn {
          outline: none;
          font-size: var(--default-font-size);
          cursor: pointer;
          letter-spacing: 0.8px;
          padding: 0.8rem 3rem;
          border: 1px solid transparent;
          border-radius: 10px;
          background: ${socialMediaColors[socialMedia]};
          color: #fff;
          transition: all 0.3s ease-out;
        }
        .btn:hover {
          box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
          border: 1px solid ${socialMediaColors[socialMedia]};
          transition: all 0.3s ease-in;
        }
        .btn:before {
          display: none;
        }
        .btn img {
          width: 2rem;
          margin-right: 0.7rem;
        }
      `}
      </style>
    </>
  )
})
