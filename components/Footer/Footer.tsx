import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

export const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <footer className='bg-white flex flex-col items-center justify-center py-6 text-lg border-t-2 border-gray-600 dark:border-gray-400 dark:bg-black'>
      <p>
        <Link href='/'>
          <a className='hover:underline text-green-800 dark:text-green-400'>
            Thream
          </a>
        </Link>{' '}
        | {t('common:all-rights-reserved')}
      </p>
    </footer>
  )
}
