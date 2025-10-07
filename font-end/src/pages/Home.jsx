import React from 'react'
import Hero from '../components/Hero'
import LatesCollection from '../components/LatesCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';

const Home = () => {
  return (
    <div>
      <Hero />
      <LatesCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
}

export default Home