import Image from 'next/image'

export interface LanguageFlagProps {
  language: string
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
      <p className='mx-2 text-base'>{language.toUpperCase()}</p>
    </>
  )
}
