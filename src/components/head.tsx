import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useSiteMetadata } from '@/hooks/useSiteMetadata';

interface IProps {
  title?: string;
  description?: string;
  image?: string;
}

function Head({ title, description, image }: IProps) {
  const { pathname } = useLocation();
  const siteMetaData = useSiteMetadata();
  const seo = {
    title: title || siteMetaData.defaultTitle,
    description: description || siteMetaData.defaultDescription,
    image: `${siteMetaData.siteUrl}${image || siteMetaData.defaultImage}`,
    url: `${siteMetaData.siteUrl}${pathname}`,
  };

  return (
    <Helmet
      title={title}
      defaultTitle={seo.title}
      titleTemplate={`%s | ${siteMetaData.defaultTitle}`}
    >
      <html lang="en" />

      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:creator" content={siteMetaData.twitterUsername} />
      <meta property="twitter:title" content={seo.title} />
      <meta property="twitter:description" content={seo.description} />
      <meta property="twitter:image" content={seo.image} />

      <meta
        property="goggle-site-verification"
        content="UioQIr5SPeUs58q_xgGthNzwyiZMwimCtr9iVo62SHc"
      />
    </Helmet>
  );
}

export default Head;
