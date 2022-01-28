import { useStaticQuery, graphql } from 'gatsby';

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            defaultImage: image
            siteUrl
            twitterUsername
          }
        }
      }
    `
  );
  return site.siteMetadata;
};
