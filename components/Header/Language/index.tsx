import { useContext } from 'react'

import { ThemeContext } from 'contexts/Theme'

export const Language: React.FC = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <>
      <div className='flag-button'>
        <img
          className='flag-image'
          src='/images/flags/english.svg'
          alt='english'
        />
        <p className='flag-language'>EN</p>
        <svg
          width='12'
          height='8'
          viewBox='0 0 12 8'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.8024 0.292969L5.61855 4.58597L1.43469 0.292969L0.0566406 1.70697L5.61855 7.41397L11.1805 1.70697L9.8024 0.292969Z'
            fill={theme === 'dark' ? '#fff' : '#181818'}
          />
        </svg>
      </div>

      <style jsx>
        {`
          .flag-button {
            display: flex;
            align-items: center;
            margin-right: 15px;
          }
          .flag-image {
            width: 35px;
            height: 35px;
            margin-right: 10px;
          }
          .flag-language {
            margin: 0 8px 0 0;
          }
        `}
      </style>
    </>
  )
}
