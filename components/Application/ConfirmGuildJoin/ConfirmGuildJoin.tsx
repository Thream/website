import Image from 'next/image'

export interface ConfirmGuildJoinProps {
  className?: string
  handleJoinGuild: () => void
}

export const ConfirmGuildJoin: React.FC<ConfirmGuildJoinProps> = (props) => {
  const { className, handleJoinGuild } = props

  return (
    <div className={className}>
      <Image
        src='/images/svg/design/join-guild.svg'
        alt='Joing Guild Illustration'
        height={150}
        width={150}
      />
      <div className='flex flex-col mt-8'>
        <h1 className='text-xl mb-6 text-center'>Rejoindre la guild ?</h1>
        <div className='flex gap-7'>
          <button
            className='px-8 py-2 rounded-3xl bg-success hover:opacity-50 transition'
            onClick={handleJoinGuild}
          >
            Oui
          </button>
          <button
            className='px-8 py-2 rounded-3xl bg-error hover:opacity-50 transition'
            onClick={handleJoinGuild}
          >
            Non
          </button>
        </div>
      </div>
    </div>
  )
}
