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
      <div className='mt-8 flex flex-col'>
        <h1 className='mb-6 text-center text-xl'>Rejoindre la guild ?</h1>
        <div className='flex gap-7'>
          <button
            className='rounded-3xl bg-success px-8 py-2 transition hover:opacity-50'
            onClick={handleJoinGuild}
          >
            Oui
          </button>
          <button
            className='rounded-3xl bg-error px-8 py-2 transition hover:opacity-50'
            onClick={handleJoinGuild}
          >
            Non
          </button>
        </div>
      </div>
    </div>
  )
}
