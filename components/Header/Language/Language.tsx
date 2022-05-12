import { useCallback, useEffect, useState, useRef } from 'react'
import useTranslation from 'next-translate/useTranslation'
import setLanguage from 'next-translate/setLanguage'
import classNames from 'classnames'

import { Arrow } from './Arrow'
import { LanguageFlag } from './LanguageFlag'
import i18n from '../../../i18n.json'

export interface LanguageProps {
  className?: string
}

export const Language: React.FC<LanguageProps> = (props) => {
  const { className } = props
  const { lang: currentLanguage } = useTranslation()
  const [hiddenMenu, setHiddenMenu] = useState(true)
  const languageClickRef = useRef<HTMLDivElement | null>(null)

  const handleHiddenMenu = useCallback(() => {
    setHiddenMenu((oldHiddenMenu) => !oldHiddenMenu)
  }, [])

  useEffect(() => {
    const handleClickEvent = (event: MouseEvent): void => {
      if (languageClickRef.current == null || event.target == null) {
        return
      }
      if (!languageClickRef.current.contains(event.target as Node)) {
        setHiddenMenu(true)
      }
    }

    window.document.addEventListener('click', handleClickEvent)

    return () => {
      return window.removeEventListener('click', handleClickEvent)
    }
  }, [])

  const handleLanguage = async (language: string): Promise<void> => {
    await setLanguage(language)
  }

  return (
    <div className='relative flex cursor-pointer flex-col items-center justify-center'>
      <div
        ref={languageClickRef}
        data-cy='language-click'
        className='mr-5 flex items-center'
        onClick={handleHiddenMenu}
      >
        <LanguageFlag language={currentLanguage} />
        <Arrow />
      </div>

      <ul
        data-cy='languages-list'
        className={classNames(
          className,
          'absolute top-16 z-10 mr-4 flex w-24 list-none flex-col items-center justify-center rounded-lg bg-white p-0 shadow-lightFlag dark:bg-black dark:shadow-darkFlag',
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
              className='flex h-12 w-full items-center justify-center pl-2 hover:bg-[#4f545c] hover:bg-opacity-20'
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
