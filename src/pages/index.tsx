import React from 'react';
import App from '@/containers/app';
import FaceSection from '@/components/sections/face';
import AboutSection from '@/components/sections/about';
import JobsSection from '@/components/sections/jobs';
import ContactSection from '@/components/sections/contact';

function IndexPage({ location }) {
  return (
    <App location={location}>
      <FaceSection />
      <AboutSection />
      <JobsSection />
      <ContactSection />
    </App>
  );
}

export default IndexPage;
