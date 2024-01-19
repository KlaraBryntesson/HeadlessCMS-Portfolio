import { graphql, useStaticQuery } from "gatsby";

export const projectsQuery = graphql`
  query {
    allContentfulProjects(sort: { created: DESC }) {
      nodes {
        category
        created(formatString: "")
        image {
          gatsbyImageData(
            formats: [AUTO, WEBP, AVIF]
            placeholder: BLURRED
            layout: FULL_WIDTH
          )
        }
        images {
          title
          gatsbyImageData(
            formats: [AUTO, WEBP, AVIF]
            placeholder: BLURRED
            layout: FULL_WIDTH
          )
        }
        longDescription {
          raw
        }
        metaData
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
      metaData
    }
  }
`;

export const useProjectsQuery = () => {
  return useStaticQuery(projectsQuery);
};
