import InfiniteScroll from 'react-infinite-scroll-component'

import { Divider } from '../../design/Divider'
import { Loader } from 'components/design/Loader'
import { useMembers } from 'contexts/Members'
import { Member } from './Member'

export const Members: React.FC = () => {
  const { members, hasMore, nextPage } = useMembers()

  return (
    <>
      <div className='mb-2'>
        <h1 className='text-center pt-2 my-2 text-xl'>Members</h1>
        <Divider />
      </div>
      <InfiniteScroll
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
