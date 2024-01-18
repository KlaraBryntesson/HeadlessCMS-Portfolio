import { graphql, useStaticQuery } from "gatsby";

export const homeQuery = graphql`
  query {
    contentfulHomePage {
      pageTitle
      shortDescription {
        shortDescription
      }
      heading
      image {
        gatsbyImageData(
          formats: [AUTO, WEBP, AVIF]
          placeholder: BLURRED
          layout: FULL_WIDTH
        )
      }
    }
  }
`;

export const useHomeQuery = () => {
  return useStaticQuery(homeQuery);
};
