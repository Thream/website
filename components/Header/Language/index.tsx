import { useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import setLanguage from 'next-translate/setLanguage'

import { Arrow } from './Arrow'
import { languages, Language as LanguageType } from 'utils/authentication'
import { LanguageFlag } from './LanguageFlag'

export const Language: React.FC = () => {
  const { lang: currentLanguage } = useTranslation()
  const [hiddenMenu, setHiddenMenu] = useState(true)

  useEffect(() => {
    if (!hiddenMenu) {
      window.document.addEventListener('click', handleHiddenMenu)
    } else {
      window.document.removeEventListener('click', handleHiddenMenu)
    }

    return () => {
      window.document.removeEventListener('click', handleHiddenMenu)
    }
  }, [hiddenMenu])

  const handleLanguage = async (language: LanguageType): Promise<void> => {
    await setLanguage(language)
    handleHiddenMenu()
  }

  const handleHiddenMenu = (): void => {
    setHiddenMenu(!hiddenMenu)
  }

  return (
    <>
      <div className='language-menu'>
        <div className='selected-language' onClick={handleHiddenMenu}>
          <LanguageFlag language={currentLanguage as LanguageType} />
          <Arrow />
        </div>
        {!hiddenMenu && (
          <ul>
            {languages.map((language, index) => {
              if (language === currentLanguage) {
                return null
              }
              return (
                <li
                  key={index}
                  onClick={async () => await handleLanguage(language)}
                >
                  <LanguageFlag language={language} />
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <style jsx>
        {`
          .language-menu {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
          .selected-language {
            display: flex;
            align-items: center;
            margin-right: 15px;
          }
          ul {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 60px;
            width: 100px;
            padding: 10px;
            margin: 10px 15px 0 0px;
            border-radius: 15%;
            padding: 0;
            box-shadow: 0px 1px 10px var(--color-shadow);
            background-color: var(--color-background-primary);
            z-index: 10;
          }
          ul > li {
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            width: 100%;
          }
          ul > li:hover {
            background-color: rgba(79, 84, 92, 0.16);
          }
        `}
      </style>
    </>
  )
}
