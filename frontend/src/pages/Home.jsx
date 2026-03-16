import Hero from '../components/Hero'
import Contact from '../components/Contact'
import About from '../components/About'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from '../components/Footer';

function Home() {
  const location = useLocation();

 useEffect(() => {
  if (location.hash) {
    const element = document.querySelector(location.hash);
    if (element) {
      element.scrollIntoView();
    }
  }
}, [location]);

  return (
    <div className='w-full'>
        <Hero/>
        <About/>
        <Contact/>
        <Footer/>
    </div>
    
  )
}

export default Home