import Wrapper from './components/Wrapper';
import Hero from './components/Hero';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='bg-grey-900'>
      <Hero />
      <div className='z-50 h-full bg-grey-900'>
        <Wrapper className='relative z-[1] -mt-12 flex items-center justify-center'>
          <Image src='/playground.png' width={644} height={460} alt='Code editor' className='transform transition-all duration-700 hover:-translate-y-10' />
        </Wrapper>

        <section className='Divider relative z-[1] -mt-64 h-full bg-grey-900'>
          <span className='Divider-line absolute top-0 h-[1px] w-full opacity-25'></span>
          <span className='gradients-right gradients-left opacity-30'></span>
          <span className='gradients-right gradients-right opacity-30 '></span>

          <Wrapper className='z-[2] mb-10 mt-32 flex flex-col items-center justify-center gap-10'>
            <h3 className='text-4xl'>What is pair programming?</h3>
            <div className='flex max-w-3xl flex-col gap-5 text-justify'>
              <p className='text-grey-300'>
                Pair programming is a common software development technique where two developers work on the same code, together, at the same computer.{' '}
              </p>
              <p className='tracking-wide text-grey-300'>
                One developer takes the role of 'driver' – this person takes ownership of the keyboard and mouse and physically writes the code. Meanwhile, the
                other developer – the 'navigator' – concentrates on the 'big picture' and the direction the code is going, reviewing and revising the code the
                driver is writing.
              </p>
            </div>
          </Wrapper>
          <Wrapper className='flex flex-col gap-6'>
            <h3 className='text-center text-4xl'>Advantages of pair programming</h3>
            <section className='flex gap-5 text-center'>
              <div className='h-64 w-4/12 rounded-lg border border-gray-600'>
                <h4>Knowledge sharing</h4>
                <p className='text-grey-300'>Pair programming can ensure that one or two people aren’t holding all the knowledge critical to a project.</p>
              </div>
              <div className='h-64 w-4/12 rounded-lg border border-gray-700'>
                <h4>Thinking</h4>
                <p className='text-grey-300'>Just having someone to talk through a problem with can be key to coming up with a solution.</p>
              </div>
              <div className='h-64 w-4/12 rounded-lg border border-gray-700'>
                <h4>Focus</h4>
                <p className='text-grey-300'>Having another person with you and changing roles often can help keep you fresh and focused.</p>
              </div>
              <div className='h-64 w-4/12 rounded-lg border border-gray-700'>
                <h3>Accuracy</h3>
                <p className='text-grey-300'>Having someone quality checking the code as it’s being written will improve accuracy.</p>
              </div>
            </section>
          </Wrapper>
        </section>
      </div>
    </main>
  );
}
