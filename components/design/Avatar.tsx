import Image, { ImageProps } from 'next/image'

export const Avatar: React.FC<ImageProps> = (props) => {
  return (
    <>
      <Image {...props} className='avatar-image' />

      <style jsx>
        {`
          :global(.avatar-image) {
            border-radius: 50%;
          }
        `}
      </style>
    </>
  )
}
