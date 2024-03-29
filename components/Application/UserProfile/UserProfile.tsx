import Image from "next/image"
import date from "date-and-time"
import useTranslation from "next-translate/useTranslation"

import type { UserPublic } from "../../../models/User"
import type { Guild } from "../../../models/Guild"

export interface UserProfileProps {
  className?: string
  user: UserPublic
  guilds: Guild[]
}

export const UserProfile: React.FC<UserProfileProps> = (props) => {
  const { user } = props
  const { t } = useTranslation()

  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <div className="transition">
        <div className="max-w-[1000px] px-12">
          <div className="flex items-center justify-between">
            <div className="flex w-max flex-col items-center gap-7 md:flex-row">
              <div className="relative flex items-center justify-center overflow-hidden rounded-full shadow-lg transition-all">
                <Image
                  quality={100}
                  className="rounded-full"
                  src={
                    user.logo != null
                      ? user.logo
                      : "/images/data/user-default.png"
                  }
                  alt="Profil Picture"
                  draggable="false"
                  height={125}
                  width={125}
                />
              </div>
              <div className="ml-10 flex flex-col">
                <div className="mb-2 flex items-center">
                  <p
                    className="space text-dark text-3xl font-bold tracking-wide dark:text-white"
                    data-cy="user-name"
                  >
                    {user.name}
                  </p>
                  <p
                    className="ml-8 select-none text-sm tracking-widest text-white opacity-40"
                    data-cy="user-createdAt"
                  >
                    {date.format(new Date(user.createdAt), "DD/MM/YYYY")}
                  </p>
                </div>
                <div className="my-2 text-left">
                  {user.email != null && (
                    <p className="font-bold">
                      Email:{" "}
                      <a
                        href={`mailto:${user.email}`}
                        target="_blank"
                        className="relative ml-2 font-normal tracking-wide no-underline opacity-80 transition-all after:absolute after:bottom-[-1px] after:left-0 after:h-[1px] after:w-0 after:bg-black after:transition-all hover:opacity-100 hover:after:w-full dark:after:bg-white"
                        rel="noreferrer"
                        data-cy="user-email"
                      >
                        {user.email}
                      </a>
                    </p>
                  )}
                  {user.website != null && (
                    <p className="font-bold">
                      {t("application:website")}:{" "}
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={user.website}
                        className="relative ml-2 font-normal tracking-wide no-underline opacity-80 transition-all after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-0 after:bg-black after:transition-all hover:opacity-100 hover:after:w-full dark:after:bg-white"
                      >
                        {user.website}
                      </a>
                    </p>
                  )}
                  {user.status != null && (
                    <p className="flex font-bold">
                      {t("application:status")}:{" "}
                      <span className="ml-2 font-normal tracking-wide">
                        {user.status}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {user.biography != null && (
            <div className="mt-7 text-center">
              <p>{user.biography}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
