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
              <div className='login-button'>
                <button className='btn'>Login</button>
              </div>
              <div className='flag-button'>
                <img
                  className='flag-image'
                  src='/images/flags/english.svg'
                  alt='english'
                />
                <p className='flag-language'>EN</p>
                <img src='/images/home/arrow.svg' alt='arrow' />
              </div>
              <div className='toggle-button'>
                <div className='toggle-theme-button'>
                  <div className='toggle-track'>
                    <div className='toggle-track-check'>
                      <span className='toggle_Dark'>🌜</span>
                    </div>
                    <div className='toggle-track-x'>
                      <span className='toggle_Light'>🌞</span>
                    </div>
                  </div>
                  <div className='toggle-thumb' />
                  <input
                    type='checkbox'
                    aria-label='Dark mode toggle'
                    className='toggle-screenreader-only'
                  />
                </div>
              </div>
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
            width: 140px;
          }
          .navbar__brand-logo {
            width: 60px;
            height: 60px;
          }
          .navbar__brand-title {
            font-weight: 400;
          }
          .navbar__buttons {
            display: flex;
            width: 300px;
            justify-content: space-between;
          }
          .btn {
            position: relative;
            cursor: pointer;
            font-size: var(--default-font-size);
            letter-spacing: 0.8px;
            padding: 1rem 3rem;
            font-weight: 400;
            transform: translateY(-3px);
            background-color: var(--color-background-primary);
            border: 1px solid var(--color-primary);
            border-radius: 10px;
            transition: all 0.3s ease-in;
            color: var(--color-primary);
            outline: 0;
            font-weight: 700;
          }
          .btn:hover {
            background-color: var(--color-primary);
            color: var(--color-secondary);
          }
          .flag-button {
            display: flex;
            align-items: center;
          }
          .flag-image {
            width: 35px;
            height: 35px;
            margin-right: 10px;
          }
          .flag-language {
            margin: 0 8px 0 0;
          }
          .toggle-button {
            display: flex;
            align-items: center;
          }
          .toggle-theme-button {
            touch-action: pan-x;
            display: inline-block;
            position: relative;
            cursor: pointer;
            background-color: transparent;
            border: 0;
            padding: 0;
            user-select: none;
          }
          .toggle-track {
            width: 50px;
            height: 24px;
            padding: 0;
            border-radius: 30px;
            background-color: #4d4d4d;
            transition: all 0.2s ease;
          }
          .toggle-track-check {
            position: absolute;
            width: 14px;
            height: 10px;
            top: 0;
            bottom: 0;
            margin-top: auto;
            margin-bottom: auto;
            line-height: 0;
            left: 8px;
            opacity: 1;
            transition: opacity 0.25s ease;
          }
          .toggle-track-x {
            position: absolute;
            width: 10px;
            height: 10px;
            top: 0;
            bottom: 0;
            margin-top: auto;
            margin-bottom: auto;
            line-height: 0;
            right: 10px;
            opacity: 0;
          }
          .toggle_Dark,
          .toggle_Light {
            align-items: center;
            display: flex;
            height: 10px;
            justify-content: center;
            position: relative;
            width: 10px;
          }
          .toggle-thumb {
            position: absolute;
            left: 27px;
            width: 22px;
            height: 22px;
            border: 1px solid #4d4d4d;
            border-radius: 50%;
            background-color: #fafafa;
            box-sizing: border-box;
            transition: all 0.25s ease;
            top: 1px;
          }
          .toggle-screenreader-only {
            border: 0;
            clip: rect(0 0 0 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
          }
        `}
      </style>
    </>
  )
}
