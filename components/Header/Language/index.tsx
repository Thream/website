import Image from 'next/image'

import { Arrow } from './Arrow'

export const Language: React.FC = () => {
  return (
    <>
      <div className='language'>
        <Image
          width={35}
          height={35}
          src='/images/flags/English.svg'
          alt='English'
        />
        <p className='language-title'>EN</p>
        <Arrow />
      </div>

      <style jsx>
        {`
          .language {
            display: flex;
            align-items: center;
            margin-right: 15px;
          }
          .language-title {
            margin: 0 8px 0 10px;
          }
        `}
      </style>
    </>
  )
}
