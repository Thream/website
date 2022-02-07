import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import { API_VERSION } from '../../tools/api'
import { VersionLink } from './VersionLink'

export interface FooterProps {
  version: string
}

export const Footer: React.FC<FooterProps> = (props) => {
  const { t } = useTranslation()
  const { version } = props

  return (
    <footer className='flex flex-col items-center justify-center border-t-2 border-gray-600 bg-white py-6 text-lg dark:border-gray-400 dark:bg-black'>
      <p>
        <Link href='/'>
          <a className='text-green-800 hover:underline dark:text-green-400'>
            Thream
          </a>
        </Link>{' '}
        | {t('common:all-rights-reserved')}
      </p>
      <p className='mt-1'>
        <VersionLink repository='website' version={version} /> |{' '}
        <VersionLink repository='api' version={API_VERSION} />
      </p>
    </footer>
  )
}
