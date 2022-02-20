import React from 'react';
import App from '@/containers/app';
import FaceSection from '@/components/sections/face';
import AboutSection from '@/components/sections/about';
import JobsSection from '@/components/sections/jobs';

function IndexPage({ location }) {
  return (
    <App location={location}>
      <FaceSection />
      <AboutSection />
      <JobsSection />
    </App>
  );
}

export default IndexPage;
