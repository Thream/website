import { Main } from './Main'
import { Sidebar } from './Sidebar'

export const Application: React.FC = () => {
  return (
    <>
      <div className='application'>
        <Sidebar />
        <Main />
      </div>

      <style jsx global>
        {`
          body {
            --sidebar-width: 11rem;
          }
        `}
      </style>
    </>
  )
}
