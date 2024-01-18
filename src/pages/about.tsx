import React from "react";
import { PageProps } from "gatsby";
import { ContentfulAbout, Education } from "../helpers/types";
import Layout from "../components/layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ImageDataLike, getImage } from "gatsby-plugin-image";
import ProjectImage from "../components/ProjectImage";
import { useAboutQuery } from "../helpers/useAboutQuery";

interface Experience {
  title: string;
  location: string;
  fromYear: number;
  toYear: number | string;
  description: string;
}

const ExperienceComponent: React.FC<{ experience: Experience }> = ({
  experience,
}) => {
  return (
    <li>
      <div className="about-experience-header">
        <h3>{experience.title}</h3>
        <div className="about-experience-location">
          <p>{experience.location}</p>
          <span>
            {experience.fromYear} - {experience.toYear}
          </span>
        </div>
      </div>
      <p>{experience.description}</p>
      <hr />
    </li>
  );
};

const AboutPage: React.FC<PageProps> = () => {
  const aboutData = useAboutQuery();
  const about: ContentfulAbout = aboutData.contentfulAbout;
  const experienceData: Education[] = aboutData.allContentfulEducation.nodes;
  const image = getImage(about.images?.[0]?.gatsbyImageData as ImageDataLike);

  console.log(image);

  let educationData: Experience[] = [];
  let workData: Experience[] = [];

  experienceData.map((experience) => {
    const fromDate = new Date(experience.fromDate as string);
    const fromYear = fromDate.getFullYear();
    const toDateValue = experience.toDate;
    let toYear;

    if (toDateValue !== null) {
      const toDate = new Date(experience.toDate as string);
      toYear = toDate.getFullYear();
    } else {
      toYear = "Ongoing";
    }

    if (experience.isEducation) {
      educationData.push({
        title: experience.title,
        location: experience.location,
        fromYear: fromYear,
        toYear: toYear,
        description: experience.description.description,
      });
    } else {
      workData.push({
        title: experience.title,
        location: experience.location,
        fromYear: fromYear,
        toYear: toYear,
        description: experience.description.description,
      });
    }
  });

  return (
    <Layout title={about.pageTitle}>
      <div className="intro-container about-intro-container">
        <div className="about-image-div">
          <ProjectImage className="about-image" image={image} />
          {/* {aboutData.images && (
            <img className="about-image" src={aboutData.images[0].url} alt="" />
          )} */}
        </div>
        <div className="intro-div about-intro-div">
          <p className="about-intro">{about.biography}</p>
        </div>
      </div>
      <div className="about-skills-container">
        {about.skills &&
          about.skills.map((skill) => <p className="about-skills">{skill}</p>)}
      </div>
      <div className="about-description-container">
        {about.description &&
          documentToReactComponents(JSON.parse(about.description.raw))}
      </div>
      <div className="about-experience-container">
        <div className="about-experience-wrapper">
          <h2>Education</h2>
          <ul>
            {educationData.map((education) => (
              <ExperienceComponent
                key={education.title}
                experience={education}
              />
            ))}
          </ul>
        </div>
        <div className="about-experience-wrapper">
          <h2>Work experience</h2>
          <ul>
            {workData.map((work) => (
              <ExperienceComponent key={work.title} experience={work} />
            ))}
          </ul>
        </div>
      </div>
      {/* -- För att lägga in statiska bilder:
      <StaticImage alt="en bild" src="../images/profile-pic.png" /> */}
    </Layout>
  );
};

// export const Head = () => <title>Klara Bryntesson | About</title>;
export default AboutPage;
