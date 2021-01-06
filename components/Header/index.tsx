import { Language } from './Language'
import { SwitchTheme } from './SwitchTheme'

export const Header: React.FC = () => {
  return (
    <>
      <header className='Header'>
        <div className='container'>
          <nav className='navbar navbar--fixed-top'>
            <div className='navbar__brand'>
              <img
                className='navbar__brand-logo'
                src='/images/home/Thream_icon.png'
                alt='Thream'
              />
              <strong className='navbar__brand-title'>Thream</strong>
            </div>
            <div className='navbar__buttons'>
              <Language />
              <SwitchTheme />
            </div>
          </nav>
        </div>
      </header>

      <style jsx>
        {`
          .Header {
            margin-top: 20px;
            height: 130px;
          }
          .container {
            padding: 0 32px;
            max-width: 1280px;
            width: 100%;
            margin: auto;
          }
          @media (max-width: 404px) {
            .container {
              padding: 0;
            }
          }
          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 1rem;
          }
          .navbar--fixed-top {
            position: sticky;
            top: 0;
            z-index: 200;
          }
          .navbar__brand {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .navbar__brand-logo {
            width: 60px;
            height: 60px;
            margin-right: 10px;
          }
          .navbar__brand-title {
            font-weight: 400;
          }
          .navbar__buttons {
            display: flex;
            justify-content: space-between;
          }
        `}
      </style>
    </>
  )
}
