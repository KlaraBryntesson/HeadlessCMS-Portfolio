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
import AnimatePage from "../components/AnimatePage";

const TestPage: React.FC<PageProps> = () => {
  const labelsData = useLabelsQuery();
  const homeData = useHomeQuery();
  const labels: Labels = labelsData.contentfulLabels;
  const home: ContentfulHomePage = homeData.contentfulHomePage;
  const image = getImage(home.image.gatsbyImageData as ImageDataLike);

  return (
    <MainTest>
      <Navbar>
        <div>
          <i className="bi bi-lightning-fill" />
          <span>Klara Bryntesson</span>
        </div>
        <Menu>
          <li>About</li>
          <li>Projects</li>
          <li>
            <Button type="button">
              <Link to="/contact">Contact me!</Link>
            </Button>
          </li>
        </Menu>
      </Navbar>
      <AnimatePage>
        <IntroContainer className="intro-container">
          <div className="home-intro-div home-intro-div1">
            <div className=" home-image-div">
              <ProjectImage image={image} />
            </div>
          </div>
          <div className="home-intro-div home-intro-div2">
            <h1 className="home-heading">{home.heading}</h1>
            <p>{home.shortDescription?.shortDescription}</p>
            <PrimaryButton type="button">
              <Link to="/about">{labels.learnMore}</Link>
            </PrimaryButton>
            <PrimaryButton type="button">
              <Link to="/test">Testsida</Link>
            </PrimaryButton>
          </div>
        </IntroContainer>
      </AnimatePage>
    </MainTest>
  );
};

export default TestPage;

const MainTest = styled.div`
  width: 100%;
  height: 1000px;
  background-color: var(--color-green);
  color: var(--color-beige);
`;

const Navbar = styled.div`
  width: 100%;
  height: 100px;
  /* background-color: var(--color-green);
  color: var(--color-beige); */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: var(--fontSize-3);
    font-weight: 700;
  }

  i {
    color: var(--color-bright-orange);
  }
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  width: 400px;

  li {
    font-weight: 700;
    margin: 0;
  }
`;

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

const Button = styled.button`
  background-color: var(--color-yellow);
  border: none;
  border-radius: 30px;
  color: var(--color-darker-text);
  /* font-weight: var(--fontWeight-bold); */
  margin: 0;
  transition: 0.2s ease-in;
  text-transform: none;
  width: 120px;
  height: 30px;

  &:hover {
    background-color: var(--color-light-pink);
  }
`;
