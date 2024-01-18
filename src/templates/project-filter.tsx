import { graphql, PageProps } from "gatsby";
import * as React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Link } from "gatsby";
import Layout from "../components/layout";
import { Data } from "../helpers/types";
import { getImage, ImageDataLike } from "gatsby-plugin-image";
import ProjectImage from "../components/ProjectImage";

const FilterProjects: React.FC<PageProps<Data>> = ({ data }) => {
  return (
    <Layout title="Portfolio">
      {data.allContentfulProjects.nodes.map((project) => {
        const imageData = project.image.gatsbyImageData as ImageDataLike;
        const image = getImage(imageData);
        return (
          <div>
            <h1>
              <Link to={`/${project.slug}`}>{project.title}</Link>
            </h1>
            <div>
              <p>
                {documentToReactComponents(
                  JSON.parse(project.longDescription.raw)
                )}
              </p>
              <ProjectImage image={image} />
            </div>
          </div>
        );
      })}
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($techStack: String) {
    allContentfulProjects(filter: { techStack: { eq: $techStack } }) {
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
  }
`;

export const Head = () => <title>Home Page</title>;
export default FilterProjects;
