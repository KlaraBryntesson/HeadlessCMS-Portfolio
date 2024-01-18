const path = require("path");
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  // Define a template for blog post
  const projectPage = path.resolve("./src/templates/project-page.tsx");
  const filterProjects = path.resolve("./src/templates/project-filter.tsx");
  const result = await graphql(
    `
      {
        allContentfulProjects {
          nodes {
            created(formatString: "")
            image {
              url
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
    `
  );
  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors
    );
    return;
  }

  const projects = result.data.allContentfulProjects.nodes;
  if (projects.length > 0) {
    projects.forEach((project) => {
      createPage({
        path: `/${project.slug}/`,
        component: projectPage,
        context: {
          slug: project.slug,
        },
      });
    });
  }

  const filter = result.data.allContentfulProjects.nodes;
  if (filter.length > 0) {
    filter.forEach((project) => {
      project.techStack.forEach((skill) => {
        const lowerCaseSkill = skill.toLowerCase();
        console.log(skill);
        createPage({
          path: `/tech-stack/${lowerCaseSkill}/`,
          component: filterProjects,
          context: {
            techStack: skill,
          },
        });
      });
    });
  }
};
