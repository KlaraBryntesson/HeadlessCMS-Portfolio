import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/layout";
import { Labels, Project } from "../helpers/types";
import PrimaryButton from "../components/PrimaryButton";
import ProjectImage from "../components/ProjectImage";
import { useLabelsQuery } from "../helpers/useLabelsQuery";
import ChangeButton from "../components/ChangeButton";
import "bootstrap-icons/font/bootstrap-icons.css";
import AnimatePage from "../components/AnimatePage";
import styled from "styled-components";

interface ProjectPageProps {
  data: Data;
}

interface Data {
  project: Project;
}

const ProjectPage = (props: ProjectPageProps) => {
  const project: Project = props.data.project;

  // Fetching labels data using a custom query
  const labelsData = useLabelsQuery();
  const labels: Labels = labelsData.contentfulLabels;

  // Getting project images and managing current image state
  const image = project.image;
  const projectImages = project.images;
  const [currentImage, setCurrentImage] = useState(0);

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? projectImages.length - 1 : prevImage - 1
    );
  };

  // Function to go to the next image
  const nextImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === projectImages.length - 1 ? 0 : prevImage + 1
    );
  };

  // Ensure currentImage is within a valid range
  useEffect(() => {
    if (currentImage < 0) {
      setCurrentImage(0);
    } else if (currentImage >= projectImages.length) {
      setCurrentImage(projectImages.length - 1);
    }
  }, [currentImage, projectImages]);

  return (
    <Layout metaData={project.metaData} header={true} title={project.title}>
      <AnimatePage>
        <>
          {/* Container for project introduction and description */}
          <ProjectIntro className="intro-container">
            {/* Container for project images */}
            <div className="intro-div project-intro-div project-intro-div1">
              {/* Container for project description */}
              <div className="project-description-div">
                <div>
                  {/* Render rich-text content from Contentful */}
                  {documentToReactComponents(
                    JSON.parse(project.longDescription.raw)
                  )}
                </div>
              </div>
              {project.techStack && (
                <Wrapper>
                  <ProjectHeader>Techstack</ProjectHeader>
                  <List>
                    {project.techStack.map((tech, index) => (
                      <Item key={`${tech}${index}`}>
                        <span>
                          {" "}
                          {tech}
                          {project.techStack &&
                            index < project.techStack.length - 1 && (
                              <strong> | </strong>
                            )}
                        </span>
                      </Item>
                    ))}
                  </List>
                </Wrapper>
              )}
              {/* Display collaborators if available */}
              {project.participants && (
                <Wrapper>
                  <ProjectHeader>{labels.collaborators}</ProjectHeader>
                  <List>
                    {project.participants.map((participant, index) => (
                      <Item key={participant}>
                        <span>
                          {" "}
                          {participant}
                          {project.participants &&
                            index < project.participants.length - 1 && (
                              <strong> | </strong>
                            )}
                        </span>
                      </Item>
                    ))}
                  </List>
                </Wrapper>
              )}
            </div>
            <ButtonWrapper className="intro-div project-intro-div project-intro-div2">
              {/* Display a button with a link to the project URL if available */}
              {project.url && (
                <PrimaryButton type="button">
                  <a href={project.url} target="__blank">
                    {labels.visitSite}
                  </a>
                </PrimaryButton>
              )}
            </ButtonWrapper>
          </ProjectIntro>
          <ImageContainer>
            <ImageDiv>
              <ProjectImage image={image.gatsbyImageData} alt={image.title} />
            </ImageDiv>
            <CarouselDiv>
              {projectImages.length > 0 && (
                <ProjectImage
                  image={projectImages[currentImage].gatsbyImageData}
                  alt={`Image ${currentImage + 1}`}
                />
              )}
              {/* Buttons to change project images */}
              <ChangeButton direction="prev" onClick={prevImage}>
                <i className="bi bi-chevron-left" />
              </ChangeButton>
              <ChangeButton direction="next" onClick={nextImage}>
                <i className="bi bi-chevron-right" />
              </ChangeButton>
            </CarouselDiv>
          </ImageContainer>
        </>
      </AnimatePage>
    </Layout>
  );
};

export default ProjectPage;

// GraphQL query to fetch project data based on slug
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

const ProjectIntro = styled.div`
  margin: auto;
  margin-top: var(--spacing-4);
  min-height: 200px !important;
  padding-bottom: 2rem;
  width: 90%;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

const ProjectHeader = styled.h3`
  white-space: nowrap;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 0.4rem;
  width: 90%;

  @media (max-width: 850px) {
    align-self: center;
  }
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
`;

const Item = styled.li`
  display: flex;
  font-size: 0.8rem;
  margin-bottom: 0;
  margin-left: 5px;
`;

const ButtonWrapper = styled.div`
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  margin-bottom: 4rem;
  max-height: 350px;
  width: 90%;
`;

const ImageDiv = styled.div`
  width: 35%;
`;

const CarouselDiv = styled.div`
  position: relative;
  overflow: hidden;
  width: 60%;
`;
