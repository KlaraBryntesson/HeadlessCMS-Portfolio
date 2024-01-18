import * as React from "react";
import { PageProps, Link } from "gatsby";
import Layout from "../components/layout";
import "../styles.css";
import { Data, Project } from "../helpers/types";
import PrimaryButton from "../components/PrimaryButton";
import { getImage, ImageDataLike } from "gatsby-plugin-image";
import ProjectImage from "../components/ProjectImage";
import { useLabelsQuery } from "../helpers/useLabelsQuery";
import { useProjectsQuery } from "../helpers/useProjectsQuery";

const ProjectsPage: React.FC<PageProps<Data>> = ({ data }) => {
  const labelsData = useLabelsQuery();
  const projectData = useProjectsQuery();
  const labels = labelsData.contentfulLabels;
  const projects: Project[] = projectData.allContentfulProjects.nodes;
  const projectPage = projectData.contentfulProjectPage;

  const scrollDown = () => {
    const projectsList = document.getElementById("projects");

    if (projectsList) {
      projectsList.classList.add("scroll-smooth");
      projectsList.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        projectsList.classList.remove("scroll-smooth");
      }, 700);
    }
  };

  return (
    <Layout title={projectPage.pageTitle}>
      <div className="intro-container projects-intro-container">
        <div className="intro-div">
          <div className="projects-button-container">
            <PrimaryButton onClick={scrollDown}>{labels.explore}</PrimaryButton>
          </div>
        </div>
        <div className="intro-div projects-intro-div">
          <p>{projectPage.projectIntro.projectIntro}</p>
        </div>
      </div>
      <hr className="projects-list-divider" />
      <ul id="projects" className="new-projects-list">
        {projects.map((project) => {
          // const imageData = project.image.gatsbyImageData as ImageDataLike;
          const image = getImage(
            project.image.gatsbyImageData as ImageDataLike
          );
          const date = new Date(project.created as string);
          const year = date.getFullYear();
          const month = date.toLocaleString("en-US", { month: "short" });
          return (
            <li key={project.title} className="new-projects-list-item">
              <section className="new-projects-list-wrapper">
                <div className="new-projects-list-child image-date-wrapper">
                  {/* <div className="new-projects-date-container">
                    <p>{month}</p>
                    <hr />
                    <p>{year}</p>
                  </div> */}
                  <div className="new-projects-image-container">
                    <ProjectImage
                      className="new-projects-list-image"
                      image={image}
                    />
                    {/* <img
                      className="new-projects-list-image"
                      src={project.image.url}
                      alt=""
                    /> */}
                  </div>
                </div>
                <div className="new-projects-list-child">
                  <div className="projects-description-container">
                    <div className="date-container">
                      <span>{month} /</span>
                      <span> {year}</span>
                      <hr />
                    </div>
                    <h2>
                      <Link to={`/${project.slug}`} itemProp="url">
                        <span itemProp="headline">{project.title}</span>
                      </Link>
                    </h2>
                    <p className="project-description">
                      {project.shortDescription.shortDescription}
                    </p>
                    <PrimaryButton>{labels.readMore}</PrimaryButton>
                  </div>
                </div>
              </section>
              <hr className="projects-list-divider" />
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default ProjectsPage;
