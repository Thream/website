import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export const SwitchTheme: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleClick = (): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <div
        className='flex items-center'
        data-cy='switch-theme-click'
        onClick={handleClick}
      >
        <div className='toggle-theme-button relative cursor-pointer bg-transparent inline-block'>
          <div className='toggle-track'>
            <div
              data-cy='switch-theme-dark'
              className='toggle-track-check absolute'
            >
              <span className='toggle_Dark flex justify-center items-center relative'>
                🌜
              </span>
            </div>
            <div
              data-cy='switch-theme-light'
              className='toggle-track-x absolute'
            >
              <span className='toggle_Light flex justify-center items-center relative'>
                🌞
              </span>
            </div>
          </div>
          <div className='toggle-thumb absolute' />
          <input
            data-cy='switch-theme-input'
            type='checkbox'
            aria-label='Dark mode toggle'
            className='toggle-screenreader-only absolute overflow-hidden'
            defaultChecked
          />
        </div>
      </div>

      <style jsx>
        {`
          .toggle-theme-button {
            touch-action: pan-x;
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
            color: #fff;
          }
          .toggle-track-check {
            width: 14px;
            height: 10px;
            top: 0;
            bottom: 0;
            margin-top: auto;
            margin-bottom: auto;
            line-height: 0;
            left: 8px;
            opacity: ${theme === 'dark' ? 1 : 0};
            transition: opacity 0.25s ease;
          }
          .toggle-track-x {
            width: 10px;
            height: 10px;
            top: 0;
            bottom: 0;
            margin-top: auto;
            margin-bottom: auto;
            line-height: 0;
            right: 10px;
            opacity: ${theme === 'dark' ? 0 : 1};
          }
          .toggle_Dark,
          .toggle_Light {
            height: 10px;
            width: 10px;
          }
          .toggle-thumb {
            left: ${theme === 'dark' ? '27px' : '0px'};
            width: 22px;
            height: 22px;
            border: 1px solid #4d4d4d;
            border-radius: 50%;
            background-color: #fafafa;
            box-sizing: border-box;
            transition: all 0.25s ease;
            top: 1px;
            color: #fff;
          }
          .toggle-screenreader-only {
            border: 0;
            clip: rect(0 0 0 0);
            height: 1px;
            margin: -1px;
            padding: 0;
            width: 1px;
          }
        `}
      </style>
    </>
  )
}
