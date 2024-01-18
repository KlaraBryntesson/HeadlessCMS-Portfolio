import { graphql, useStaticQuery } from "gatsby";

export const aboutQuery = graphql`
  query {
    contentfulAbout {
      pageTitle
      age
      description {
        raw
      }
      images {
        gatsbyImageData(
          formats: [AUTO, WEBP, AVIF]
          placeholder: BLURRED
          layout: FULL_WIDTH
        )
      }
      name
      biography
      skills
    }
    allContentfulEducation {
      nodes {
        title
        location
        description {
          description
        }
        fromDate(formatString: "")
        toDate(formatString: "")
        isEducation
      }
    }
  }
`;

export const useAboutQuery = () => {
  return useStaticQuery(aboutQuery);
};
