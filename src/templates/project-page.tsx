import React from "react";
import { graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/layout";
import { Project } from "../helpers/types";
import PrimaryButton from "../components/PrimaryButton";
import ProjectImage from "../components/ProjectImage";
import { ImageDataLike, getImage } from "gatsby-plugin-image";

interface ProjectPageProps {
  data: Data;
}

interface Data {
  project: Project;
}

const ProjectPage = (props: ProjectPageProps) => {
  const project = props.data.project;
  const imageData = project.image.gatsbyImageData as ImageDataLike;
  const image = getImage(imageData);
  console.log(props.data);
  console.log(project);
  return (
    <Layout title={project.title}>
      <div>
        {documentToReactComponents(JSON.parse(project.longDescription.raw))}
      </div>
      <ProjectImage image={image} />
      {/* <img src={project.image.url} alt="bild" width="400" /> */}
      {project.url && (
        <PrimaryButton>
          <a href={project.url} target="__blank">
            Visit site
          </a>
        </PrimaryButton>
      )}
    </Layout>
  );
};

export default ProjectPage;
export const Head = () => <title>Klara Bryntesson | Project</title>;

export const pageQuery = graphql`
  query ($slug: String!) {
    project: contentfulProjects(slug: { eq: $slug }) {
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
      slug
      title
      url
      techStack
      participants
      created
    }
  }
`;
