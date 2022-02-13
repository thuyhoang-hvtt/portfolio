import React from 'react';
import App from '@/containers/app';
import FaceSection from '@/components/sections/face';
import AboutSection from '@/components/sections/about';

function IndexPage({ location }) {
  return (
    <App location={location}>
      <FaceSection />
      <AboutSection />
    </App>
  );
}

export default IndexPage;
