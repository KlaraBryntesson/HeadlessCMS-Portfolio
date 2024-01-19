import * as React from "react";
import { PageProps, Link } from "gatsby";
import Layout from "../components/layout";
import "../styles.css";
import PrimaryButton from "../components/PrimaryButton";
import { ContentfulHomePage, Labels } from "../helpers/types";
import { ImageDataLike, getImage } from "gatsby-plugin-image";
import ProjectImage from "../components/ProjectImage";
import { useLabelsQuery } from "../helpers/useLabelsQuery";
import { useHomeQuery } from "../helpers/useHomeQuery";
import styled from "styled-components";

const IndexPage: React.FC<PageProps> = () => {
  const labelsData = useLabelsQuery();
  const homeData = useHomeQuery();
  const labels: Labels = labelsData.contentfulLabels;
  const home: ContentfulHomePage = homeData.contentfulHomePage;
  const image = getImage(home.image.gatsbyImageData as ImageDataLike);

  return (
    <Layout metaData={home.metaData} title={home.pageTitle}>
      <IntroContainer className="intro-container">
        <div className="home-intro-div home-intro-div1">
          <div className=" home-image-div">
            <ProjectImage image={image} />
          </div>
        </div>
        <div className="home-intro-div home-intro-div2">
          <h1 className="home-heading">{home.heading}</h1>
          <p>{home.shortDescription?.shortDescription}</p>
          <PrimaryButton>
            <Link to="/about">{labels.learnMore}</Link>
          </PrimaryButton>
        </div>
      </IntroContainer>
    </Layout>
  );
};

export default IndexPage;

const IntroContainer = styled.div`
  flex-direction: row;
  min-height: 600px;
  padding-top: var(--spacing-10);

  @media (max-width: 1050px) {
    min-height: 500px;
  }

  @media (max-width: 850px) {
    flex-direction: column-reverse;
    justify-content: flex-end;
    min-height: 1000px;
    padding-top: var(--spacing-12);
  }

  @media (max-width: 500px) {
    padding-top: var(--spacing-8);
  }
`;
