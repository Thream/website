import Head from 'components/Head'
import { Header } from 'components/Header'

const Home: React.FC = () => {
  return (
    <>
      <Head />

      <Header />
      <div className='container'>
        <section id='about'>
          <div className='logo'>
            <img
              className='logo__image'
              src='/images/home/Thream_icon.png'
              alt='Thream'
            />
          </div>
          <div className='text'>
            <h1 className='title'>Thream</h1>
            <p className='paragraph'>
              Your <strong>open source</strong> platform to stay close with your friends and communities, <strong>talk</strong>, chat, <strong>collaborate</strong>, share and <strong>have fun</strong>.
            </p>
          </div>
        </section>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        #about {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 740px;
        }
        .logo__image {
          width: 150px;
          height: 150px;
        }
        .title {
          font-weight: 400;
        }
        .paragraph {
          font-family: 'Roboto', 'sans-serif';
          font-size: 18px;
          font-weight: 400;
          line-height: 32px;
        }
        strong {
          font-weight: 700;
          color: var(--color-primary);
        }
      `}
      </style>
    </>
  )
}

export default Home
