import './index.css';
import Demo from './components/Demo';
import Hero from './components/Hero';
import Footer from './components/Footer';

const App = () => {
  return (
    <main>
      <div className='main'>
        <div className='gradient' />
      </div>

      <div className='app'>
        <Hero />
        <Demo />
        <Footer />
      </div>
    </main>
  );
};

export default App;
