import { useCallback, useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import setLanguage from 'next-translate/setLanguage'
import classNames from 'classnames'

import { Arrow } from './Arrow'
import { LanguageFlag } from './LanguageFlag'
import i18n from '../../../i18n.json'

export const Language: React.FC = () => {
  const { lang: currentLanguage } = useTranslation()
  const [hiddenMenu, setHiddenMenu] = useState(true)

  const handleHiddenMenu = useCallback(() => {
    setHiddenMenu(!hiddenMenu)
  }, [hiddenMenu])

  useEffect(() => {
    if (!hiddenMenu) {
      window.document.addEventListener('click', handleHiddenMenu)
    } else {
      window.document.removeEventListener('click', handleHiddenMenu)
    }

    return () => {
      window.document.removeEventListener('click', handleHiddenMenu)
    }
  }, [hiddenMenu, handleHiddenMenu])

  const handleLanguage = async (language: string): Promise<void> => {
    await setLanguage(language)
    handleHiddenMenu()
  }

  return (
    <div className='relative flex flex-col justify-center items-center cursor-pointer'>
      <div
        data-cy='language-click'
        className='flex items-center mr-5'
        onClick={handleHiddenMenu}
      >
        <LanguageFlag language={currentLanguage} />
        <Arrow />
      </div>

      <ul
        data-cy='languages-list'
        className={classNames(
          'flex flex-col justify-center items-center absolute p-0 -bottom-16 z-10 w-24 mt-3 mr-4 rounded-lg list-none shadow-light dark:shadow-dark bg-white dark:bg-black',
          { hidden: hiddenMenu }
        )}
      >
        {i18n.locales.map((language, index) => {
          if (language === currentLanguage) {
            return null
          }
          return (
            <li
              key={index}
              className='flex items-center justify-center w-full h-12 hover:bg-[#4f545c] hover:bg-opacity-20 pl-2'
              onClick={async () => await handleLanguage(language)}
            >
              <LanguageFlag language={language} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
