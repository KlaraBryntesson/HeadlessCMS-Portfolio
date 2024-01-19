import React from "react";
import { PageProps } from "gatsby";
import { ContentfulAbout, Education } from "../helpers/types";
import Layout from "../components/layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ImageDataLike, getImage } from "gatsby-plugin-image";
import ProjectImage from "../components/ProjectImage";
import { useAboutQuery } from "../helpers/useAboutQuery";
import styled from "styled-components";

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
      <ExperienceHeader className="about-experience-header">
        <h3>{experience.title}</h3>
        <ExperienceLocationDiv className="about-experience-location">
          <p>{experience.location}</p>
          <span>
            {experience.fromYear} - {experience.toYear}
          </span>
        </ExperienceLocationDiv>
      </ExperienceHeader>
      <p>{experience.description}</p>
      <hr />
    </li>
  );
};

const AboutPage: React.FC<PageProps> = () => {
  // Fetch data using custom hook
  const aboutData = useAboutQuery();
  const about: ContentfulAbout = aboutData.contentfulAbout;
  const experienceData: Education[] = aboutData.allContentfulEducation.nodes;
  const image = getImage(about.images?.[0]?.gatsbyImageData as ImageDataLike);

  // Separate education and work experience data
  let educationData: Experience[] = [];
  let workData: Experience[] = [];

  experienceData.map((experience) => {
    // Process date information
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

    // Categorize data into education or work
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
    <Layout metaData={about.metaData} title={about.pageTitle}>
      <AboutIntroContainer className="intro-container">
        <ImageDiv>
          <ProjectImage className="about-image" image={image} />
        </ImageDiv>
        <AboutIntroDiv className="intro-div">
          <AboutIntro>{about.biography}</AboutIntro>
        </AboutIntroDiv>
      </AboutIntroContainer>
      <AboutSkillsContainer>
        {about.skills &&
          about.skills.map((skill, index) => (
            <div key={index}>
              <AboutSkills>{skill}</AboutSkills>
            </div>
          ))}
      </AboutSkillsContainer>
      <DescriptionContainer>
        {about.description &&
          documentToReactComponents(JSON.parse(about.description.raw))}
      </DescriptionContainer>
      <ExperienceContainer>
        <ExperienceWrapper>
          <h2>Education</h2>
          <ul>
            {educationData.map((education) => (
              <ExperienceComponent
                key={education.title}
                experience={education}
              />
            ))}
          </ul>
        </ExperienceWrapper>
        <ExperienceWrapper>
          <h2>Work experience</h2>
          <ul>
            {workData.map((work) => (
              <ExperienceComponent key={work.title} experience={work} />
            ))}
          </ul>
        </ExperienceWrapper>
      </ExperienceContainer>
    </Layout>
  );
};

export default AboutPage;

const AboutIntroContainer = styled.div`
  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const AboutIntroDiv = styled.div`
  background-color: var(--color-orange);

  @media (max-width: 650px) {
    padding: var(--spacing-10) 0;
    width: 100%;

    p {
      font-size: var(--fontSize-2);
      width: 60%;
    }
  }
`;

const AboutIntro = styled.p`
  align-self: center;
  color: var(--color-darker-text);
  font-family: var(--font-heading);
  font-size: var(--fontSize-4);
  margin: auto;
  max-width: 500px;
  width: 80%;
  text-align: center;

  @media (max-width: 850px) {
    font-size: var(--fontSize-3);
    width: 80%;
  }
`;

const AboutSkillsContainer = styled.div`
  background-color: var(--color-pink);
  color: var(--color-beige);
  display: flex;
  font-size: var(--fontSize-3);
  justify-content: space-around;
  min-height: 50px;
  padding: 30px 0;

  @media (max-width: 850px) {
    font-size: var(--fontSize-1);
    font-weight: var(--fontWeight-bold);
  }
`;

const AboutSkills = styled.p`
  margin-bottom: 0;

  @media (max-width: 650px) {
    display: none;
  }
`;

const ImageDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;

  @media (max-width: 850px) {
    width: 70%;
  }

  @media (max-width: 650px) {
    width: 100%;
  }
`;

const DescriptionContainer = styled.div`
  padding: var(--spacing-16);

  p {
    max-width: 800px;
  }

  p:nth-child(3),
  p:nth-child(6) {
    font-family: var(--font-heading);
    font-size: var(--fontSize-4);
    line-height: normal;
  }

  @media (max-width: 500px) {
    p:nth-child(3),
    p:nth-child(6) {
      font-size: var(--fontSize-3);
    }
  }
`;

const ExperienceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 1050px) {
    flex-direction: column;
  }
`;

const ExperienceWrapper = styled.div`
  background-color: var(--color-lighter-pink);
  width: 50%;
  padding: var(--spacing-8);

  &:nth-child(1) {
    background-color: var(--color-lightest-pink);
    color: var(--color-dark-orange);
  }

  &:nth-child(1) hr {
    background: var(--color-dark-orange);
  }

  h2 {
    text-align: center;
  }

  @media (max-width: 1050px) {
    padding: var(--spacing-10);
    width: 100%;

    > ul > li > p {
      width: 85%;
    }
  }
`;

const ExperienceHeader = styled.div`
  margin-bottom: var(--spacing-2);

  p,
  h3,
  span {
    font-family: var(--font-heading);
    font-size: var(--fontSize-2);
    font-weight: var(--fontWeight-bold);
    margin-bottom: 0;
  }

  > h3 {
    line-height: normal;
    text-transform: uppercase;
  }
`;

const ExperienceLocationDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: var(--spacing-3);

  span {
    margin-left: var(--spacing-1);
    min-width: 95px;
  }

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
