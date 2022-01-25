import React from 'react';
import App from '@/containers/app';
import FaceSection from '@/components/sections/face';

function IndexPage({ location }) {
  return (
    <App location={location}>
      <FaceSection />
    </App>
  );
}

export default IndexPage;
