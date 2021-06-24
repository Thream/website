import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames'

import { ApplicationProps } from '../Application'

export interface GuildsProps extends ApplicationProps {}

export const Guilds: React.FC<GuildsProps> = (props) => {
  const { path } = props

  return (
    <>
      {new Array(100).fill(null).map((_, index) => {
        return (
          <Link key={index} href={`/application/${index}/0`}>
            <a
              className='w-full flex justify-center cursor-pointer relative group'
              title='Guild name'
            >
              <Image
                src='/images/icons/Thream.png'
                alt='logo'
                width={48}
                height={48}
                className='w-12 h-12 rounded-full'
              />
              <div className='absolute flex items-center w-3 h-12 left-0'>
                <span
                  className={classNames(
                    'absolute w-4/12 bg-green-700 rounded-r-lg group-hover:h-5',
                    {
                      'h-full':
                        typeof path !== 'string' && path.guildId === index
                    }
                  )}
                ></span>
              </div>
            </a>
          </Link>
        )
      })}
    </>
  )
}
