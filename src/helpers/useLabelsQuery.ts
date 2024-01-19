import { graphql, useStaticQuery } from "gatsby";

export const labelQuery = graphql`
  query {
    contentfulLabels {
      visitSite
      searchSite
      readMore
      learnMore
      explore
      contactMe
      backToHome
      collaborators
    }
  }
`;

export const useLabelsQuery = () => {
  return useStaticQuery(labelQuery);
};
