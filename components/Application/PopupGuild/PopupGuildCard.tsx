import React from "react"
import Link from "next/link"

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
    <div className="m-8 h-96 w-80 rounded-2xl bg-gray-800">
      <div className="flex h-1/2 w-full items-center justify-center">
        {image}
      </div>
      <div className="mt-2 flex h-1/2 w-full flex-col justify-between rounded-b-2xl bg-gray-700 shadow-sm">
        <p className="mt-6 px-8 text-center text-sm text-gray-200">
          {description}
        </p>
        <Link
          href={link.href}
          className="mb-6 flex h-10 w-4/5 items-center justify-center self-center rounded-2xl bg-green-400 font-bold tracking-wide text-white transition duration-200 ease-in-out hover:bg-green-600"
        >
          {link.icon}
          {link.text}
        </Link>
      </div>
    </div>
  )
}
