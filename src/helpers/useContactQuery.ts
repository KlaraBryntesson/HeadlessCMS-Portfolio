import { graphql, useStaticQuery } from "gatsby";

export const contactQuery = graphql`
  query {
    contentfulContact {
      pageTitle
      shortDescription {
        shortDescription
      }
      email
      github
      linkedIn
      metaData
    }
  }
`;

export const useContactQuery = () => {
  return useStaticQuery(contactQuery);
};
