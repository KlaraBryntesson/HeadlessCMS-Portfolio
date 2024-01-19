import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/layout";
import { Labels, Project } from "../helpers/types";
import PrimaryButton from "../components/PrimaryButton";
import ProjectImage from "../components/ProjectImage";
import { ImageDataLike, getImage } from "gatsby-plugin-image";
import { useLabelsQuery } from "../helpers/useLabelsQuery";
import ChangeButton from "../components/ChangeButton";
import "bootstrap-icons/font/bootstrap-icons.css";

interface ProjectPageProps {
  data: Data;
}

interface Data {
  project: Project;
}

const ProjectPage = (props: ProjectPageProps) => {
  const project = props.data.project;
  const labelsData = useLabelsQuery();
  const labels: Labels = labelsData.contentfulLabels;
  const projectImages = project.images;
  const imageData = project.image.gatsbyImageData as ImageDataLike;
  // const image = getImage(imageData);
  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? projectImages.length - 1 : prevImage - 1
    );
  };

  const nextImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === projectImages.length - 1 ? 0 : prevImage + 1
    );
  };

  useEffect(() => {
    if (currentImage < 0) {
      setCurrentImage(0);
    } else if (currentImage >= projectImages.length) {
      setCurrentImage(projectImages.length - 1);
    }
  }, [currentImage, projectImages]);

  return (
    <Layout metaData={project.metaData} header={true} title={project.title}>
      <div className="intro-container project-intro-container">
        <div className="intro-div project-intro-div project-intro-div1">
          <div className="project-image-div">
            {projectImages.length > 0 && (
              <ProjectImage
                image={projectImages[currentImage].gatsbyImageData}
                alt={`Image ${currentImage + 1}`}
              />
            )}
            <ChangeButton direction="prev" onClick={prevImage}>
              <i className="bi bi-chevron-left" />
            </ChangeButton>
            <ChangeButton direction="next" onClick={nextImage}>
              <i className="bi bi-chevron-right" />
            </ChangeButton>
          </div>
        </div>
        <div className="intro-div project-intro-div project-intro-div2">
          <div className="project-description-div">
            <div>
              {documentToReactComponents(
                JSON.parse(project.longDescription.raw)
              )}
            </div>
            {project.participants && (
              <>
                <h3>{labels.collaborators}</h3>
                <ul>
                  {project.participants?.map((participant) => (
                    <li key={participant}>{participant}</li>
                  ))}
                </ul>
              </>
            )}
            {project.url && (
              <PrimaryButton>
                <a href={project.url} target="__blank">
                  {labels.visitSite}
                </a>
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectPage;
export const Head = () => <title>Klara Bryntesson | Project</title>;

export const pageQuery = graphql`
  query ($slug: String!) {
    project: contentfulProjects(slug: { eq: $slug }) {
      images {
        gatsbyImageData(
          formats: [AUTO, WEBP, AVIF]
          placeholder: BLURRED
          layout: FULL_WIDTH
        )
      }
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
      metaData
      techStack
      participants
      created
    }
  }
`;
