import Image from 'next/image'

import { Language } from 'utils/authentication'

export interface LanguageFlagProps {
  language: Language
}

export const LanguageFlag: React.FC<LanguageFlagProps> = (props) => {
  const { language } = props

  return (
    <>
      <Image
        width={35}
        height={35}
        src={`/images/svg/languages/${language}.svg`}
        alt={language}
      />
      <p className='language-title'>{language.toUpperCase()}</p>

      <style jsx>
        {`
          .language-title {
            margin: 0 8px 0 10px;
          }
        `}
      </style>
    </>
  )
}
