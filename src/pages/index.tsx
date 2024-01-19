import * as React from "react";
import { PageProps, Link } from "gatsby";
import Layout from "../components/layout";
import "../styles.css";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/ChangeButton";
import { ContentfulHomePage, HomeData, Labels } from "../helpers/types";
import { ImageDataLike, getImage } from "gatsby-plugin-image";
import ProjectImage from "../components/ProjectImage";
import { useLabelsQuery } from "../helpers/useLabelsQuery";
import { useHomeQuery } from "../helpers/useHomeQuery";

const IndexPage: React.FC<PageProps<HomeData>> = ({ data }) => {
  const labelsData = useLabelsQuery();
  const homeData = useHomeQuery();
  const labels: Labels = labelsData.contentfulLabels;
  const home: ContentfulHomePage = homeData.contentfulHomePage;
  const image = getImage(home.image.gatsbyImageData as ImageDataLike);

  return (
    <Layout metaData={home.metaData} title={home.pageTitle}>
      <div className="intro-container home-intro-container">
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
      </div>

      {/* <SecondaryButton>
        <Link to="/contact">{labels.contactMe}</Link>
      </SecondaryButton> */}

      {/* <p className="first">HOME</p>
      <p className="second">HOME</p>
      <p className="third">HOME</p>
      <p className="fourth">HOME</p>
      <p className="fifth">HOME</p>
      <p className="sixth">HOME</p>
      <p className="seventh">HOME</p>
      <p className="eighth">HOME</p>
      <p className="nineth">HOME</p>
      <p className="tenth">HOME</p>
      <p className="eleventh">HOME</p> */}
    </Layout>
  );
};

export default IndexPage;

// export const Head: HeadFC = () => <title>Klara Bryntesson | Home</title>;
