import { Button } from 'components/design/Button'
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
              src='/images/home/home.svg'
              alt='Thream'
            />
          </div>
          <div className='text'>
            <h1 className='title'>Thream</h1>
            <div className='paragraph'>
              Your <strong>open source</strong> platform to stay close with your
              friends and communities, <strong>talk</strong>, chat,{' '}
              <strong>collaborate</strong>, share and <strong>have fun</strong>.
              <div>
                <Button style={{ marginTop: 20 }}>Get Started</Button>
                <button>See on GitHub</button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>
        {`
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
            width: 200px;
            height: 200px;
            margin-right: 25px;
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
          @media (max-width: 560px) {
            .logo__image {
              width: 100%;
            }
            #about {
              flex-direction: column;
              text-align: center;
              width: 80%;
            }
          }
        `}
      </style>
    </>
  )
}

export default Home
