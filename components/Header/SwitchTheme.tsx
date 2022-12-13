import { useEffect, useState } from 'react'
import classNames from 'clsx'
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
    <div
      className='flex items-center'
      data-cy='switch-theme-click'
      onClick={handleClick}
    >
      <div className='relative inline-block cursor-pointer touch-pan-x select-none border-0 bg-transparent p-0'>
        <div className='h-[24px] w-[50px] rounded-[30px] bg-[#4d4d4d] p-0 text-white transition-all duration-200 ease-in-out'>
          <div
            data-cy='switch-theme-dark'
            className={classNames(
              'absolute top-0 bottom-0 left-[8px] mt-auto mb-auto h-[10px] w-[14px] leading-[0] transition-opacity duration-[250ms] ease-in-out',
              {
                'opacity-100': theme === 'dark',
                'opacity-0': theme === 'light'
              }
            )}
          >
            <span className='relative flex h-[10px] w-[10px] items-center justify-center'>
              🌜
            </span>
          </div>
          <div
            data-cy='switch-theme-light'
            className={classNames(
              'absolute right-[10px] top-0 bottom-0 mt-auto mb-auto h-[10px] w-[10px] leading-[0]',
              {
                'opacity-100': theme === 'light',
                'opacity-0': theme === 'dark'
              }
            )}
          >
            <span className='relative flex h-[10px] w-[10px] items-center justify-center'>
              🌞
            </span>
          </div>
        </div>
        <div
          className={classNames(
            'absolute top-[1px] box-border h-[22px] w-[22px] rounded-[50%] bg-[#fafafa] text-white transition-all duration-[250ms] ease-in-out',
            {
              'left-[27px]': theme === 'dark',
              'left-0': theme === 'light'
            }
          )}
          style={{ border: '1px solid #4d4d4d' }}
        />
        <input
          data-cy='switch-theme-input'
          type='checkbox'
          aria-label='Dark mode toggle'
          className='absolute m-[-1px] h-[1px] w-[1px] overflow-hidden border-0 p-0'
          defaultChecked
        />
      </div>
    </div>
  )
}
