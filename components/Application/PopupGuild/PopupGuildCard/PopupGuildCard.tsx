import Link from 'next/link'

export interface PopupGuildCardProps {
  image: JSX.Element
  description: string
  link: {
    href: string
    text: string
    icon: JSX.Element
  }
}

export const PopupGuildCard: React.FC<PopupGuildCardProps> = (props) => {
  const { image, description, link } = props

  return (
    <div className='w-80 h-96 m-8 rounded-2xl bg-gray-800'>
      <div className='flex justify-center items-center h-1/2 w-full'>
        {image}
      </div>
      <div className='flex justify-between flex-col h-1/2 w-full bg-gray-700 rounded-b-2xl mt-2 shadow-sm'>
        <p className='text-gray-200 mt-6 text-center px-8'>{description}</p>
        <Link href={link.href}>
          <a className='flex justify-center items-center w-4/5 h-10 rounded-2xl transition duration-200 ease-in-out text-white font-bold tracking-wide bg-green-400 self-center mb-6 hover:bg-green-600'>
            {link.icon}
            {link.text}
          </a>
        </Link>
      </div>
    </div>
  )
}
