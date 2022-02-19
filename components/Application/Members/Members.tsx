import useTranslation from 'next-translate/useTranslation'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Divider } from '../../design/Divider'
import { Loader } from '../../design/Loader'
import { useMembers } from '../../../contexts/Members'
import { Member } from './Member'
import { capitalize } from '../../../tools/utils/capitalize'

export const Members: React.FC = () => {
  const { members, hasMore, nextPage } = useMembers()

  const { t } = useTranslation()

  return (
    <>
      <div className='mb-2'>
        <h1 data-cy='members-title' className='my-2 pt-2 text-center text-xl'>
          {capitalize(t('application:members'))}
        </h1>
        <Divider />
      </div>
      <InfiniteScroll
        className='members-list'
        dataLength={members.length}
        next={nextPage}
        hasMore={hasMore}
        loader={<Loader />}
      >
        {members.map((member) => {
          return <Member key={member.id} member={member} />
        })}
      </InfiniteScroll>
    </>
  )
}
