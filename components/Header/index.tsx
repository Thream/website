import Link from 'next/link'
import Image from 'next/image'

import { Language } from './Language'
import { SwitchTheme } from './SwitchTheme'

export const Header: React.FC = () => {
  return (
    <>
      <header className='header'>
        <div className='container'>
          <nav className='navbar navbar-fixed-top'>
            <Link href='/'>
              <a className='navbar__brand-link'>
                <div className='navbar__brand'>
                  <Image
                    width={60}
                    height={60}
                    src='/images/icons/Thream.png'
                    alt='Thream'
                  />
                  <strong className='navbar__brand-title'>Thream</strong>
                </div>
              </a>
            </Link>
            <div className='navbar__buttons'>
              <Language />
              <SwitchTheme />
            </div>
          </nav>
        </div>
      </header>

      <style jsx global>
        {`
          body {
            padding: 0 32px;
          }
          @media (max-width: 404px) {
            body {
              padding: 0;
            }
          }
        `}
      </style>
      <style jsx>
        {`
          .header {
            margin-top: 20px;
          }
          .container {
            max-width: 1280px;
            width: 100%;
            margin: auto;
          }
          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 1rem;
          }
          .navbar-fixed-top {
            position: sticky;
            top: 0;
            z-index: 200;
          }
          .navbar__brand-link {
            color: var(--color-secondary);
            text-decoration: none;
            font-size: 16px;
          }
          .navbar__brand {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .navbar__brand-title {
            font-weight: 400;
            margin-left: 10px;
          }
          .navbar__buttons {
            display: flex;
            justify-content: space-between;
          }
          @media (max-width: 320px) {
            .navbar__brand-title {
              display: none;
            }
          }
        `}
      </style>
    </>
  )
}
