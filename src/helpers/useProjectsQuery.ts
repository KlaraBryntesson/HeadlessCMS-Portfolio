import { graphql, useStaticQuery } from "gatsby";

export const projectsQuery = graphql`
  query {
    allContentfulProjects {
      nodes {
        created(formatString: "")
        image {
          gatsbyImageData(
            formats: [AUTO, WEBP, AVIF]
            placeholder: BLURRED
            layout: FULL_WIDTH
          )
        }
        longDescription {
          raw
        }
        shortDescription {
          shortDescription
        }
        slug
        techStack
        title
        url
      }
    }
    contentfulProjectPage {
      pageTitle
      projectIntro {
        projectIntro
      }
    }
  }
`;

export const useProjectsQuery = () => {
  return useStaticQuery(projectsQuery);
};
