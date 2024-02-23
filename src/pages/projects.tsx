import React, { useState } from "react";
import { PageProps, Link } from "gatsby";
import Layout from "../components/layout";
import "../styles.css";
import { ContentfulProjectPage, Data, Labels, Project } from "../helpers/types";
import PrimaryButton from "../components/PrimaryButton";
import { getImage, ImageDataLike } from "gatsby-plugin-image";
import ProjectImage from "../components/ProjectImage";
import { useLabelsQuery } from "../helpers/useLabelsQuery";
import { useProjectsQuery } from "../helpers/useProjectsQuery";

const ProjectsPage: React.FC<PageProps> = () => {
  const labelsData = useLabelsQuery();
  const projectData = useProjectsQuery();
  const labels: Labels = labelsData.contentfulLabels;
  const projects: Project[] = projectData.allContentfulProjects.nodes;
  const projectPage: ContentfulProjectPage = projectData.contentfulProjectPage;
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Generating unique categories from projects
  const categories = [
    "All",
    ...new Set(projects.flatMap((project) => project.category)),
  ];

  // Filtering projects based on selected category
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) =>
          project.category.some((category) => category === selectedCategory)
        );

  // Scroll to the projects section smoothly
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
    <Layout metaData={projectPage.metaData} title={projectPage.pageTitle}>
      <div className="intro-container projects-intro-container">
        <div className="intro-div">
          <div className="projects-button-container">
            <PrimaryButton type="button" onClick={scrollDown}>
              {labels.explore}
            </PrimaryButton>
          </div>
        </div>
        <div className="intro-div projects-intro-div">
          <p>{projectPage.projectIntro.projectIntro}</p>
        </div>
      </div>

      {/* Categories for filtering projects */}
      <div className="projects-list-categories">
        {categories.map((categoryOption) => (
          <PrimaryButton
            type="button"
            key={categoryOption}
            onClick={() => setSelectedCategory(categoryOption)}
            active={Boolean(selectedCategory === categoryOption)}
          >
            {categoryOption}
          </PrimaryButton>
        ))}
      </div>

      {/* List of projects */}
      <ul id="projects" className="new-projects-list">
        {filteredProjects.map((project) => {
          const image = getImage(
            project.images[0].gatsbyImageData as ImageDataLike
          );
          const date = new Date(project.created as string);
          const year = date.getFullYear();
          const month = date.toLocaleString("en-US", { month: "short" });

          return (
            <li key={project.title} className="new-projects-list-item">
              <Link to={`/${project.slug}`} itemProp="url">
                <section className="new-projects-list-wrapper">
                  <div className="new-projects-list-child image-date-wrapper">
                    <div className="new-projects-image-container">
                      <ProjectImage
                        className="new-projects-list-image"
                        image={image}
                        alt={project.images[0].title}
                      />
                    </div>
                  </div>
                  <div className="new-projects-list-child">
                    <div className="projects-description-container">
                      <div className="date-container">
                        <span>{month} /</span>
                        <span> {year}</span>
                        <hr />
                      </div>
                      <h2>{project.title}</h2>
                      <p className="project-description">
                        {project.shortDescription.shortDescription}
                      </p>
                    </div>
                  </div>
                </section>
              </Link>
              <hr className="projects-list-divider" />
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default ProjectsPage;
