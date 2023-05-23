import { summarize } from '../assets';

const Hero = () => {
  return (
    <header className='w-full flex flex-col justify-center items-center'>
      <nav className='flex justify-between items-center w-full mb-10 pt-10'>
        <img
          src={summarize}
          alt='summarize-logo'
          className='w-56 object-contain'
        />
        <button
          type='button'
          className='rounded-full bg-gray-800 py-1.5 px-5 text-white transition-all hover:bg-gray-700 '
        >
          <a
            href='https://linktr.ee/absalipande?utm_source=linktree_profile_share&ltsid=d9c4dd12-d447-41b4-8298-f5b73c0d39bf'
            target='_blank'
            rel='noopener noreferrer'
          >
            Socials
          </a>
        </button>
      </nav>
      <hr className='w-full border-t border-gray-300 mb-5' />
      <h1 className='mt-3 text-4xl font-medium leading-normal sm:text-5xl text-center'>
        SummarAIze
      </h1>
      <h2 className='mt-3 text-base text-gray-800 sm:text-lg text-center max-w-2xl'>
        Enhance your reading experience with SummarAIze, a revolutionary
        open-source article summarizer powered by OpenAI's GPT-4. Seamlessly
        condense lengthy articles into succinct and comprehensible summaries.
        Stay informed and save valuable time with our state-of-the-art
        technology.
      </h2>
    </header>
  );
};

export default Hero;
