import { graphql, useStaticQuery } from "gatsby";

export const wrongQuery = graphql`
  query MyQuery {
    contentful404Page {
      pageTitle
      description
    }
  }
`;

export const use404Query = () => {
  return useStaticQuery(wrongQuery);
};
