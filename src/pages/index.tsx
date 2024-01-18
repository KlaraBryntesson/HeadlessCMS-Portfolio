import * as React from "react";
import { HeadFC, PageProps, useStaticQuery, Link, graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/layout";
import "../styles.css";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import { HomeData } from "../helpers/types";
import { ImageDataLike, getImage } from "gatsby-plugin-image";
import ProjectImage from "../components/ProjectImage";
import { useLabelsQuery } from "../helpers/useLabelsQuery";
import { useHomeQuery } from "../helpers/useHomeQuery";

// export const homeQuery = graphql`
//   query MyQuery {
//     contentfulHomePage {
//       pageTitle
//       shortDescription {
//         shortDescription
//       }
//       heading
//       image {
//         gatsbyImageData(
//           formats: [AUTO, WEBP, AVIF]
//           placeholder: BLURRED
//           layout: FULL_WIDTH
//         )
//       }
//     }
//   }
// `;

const IndexPage: React.FC<PageProps<HomeData>> = ({ data }) => {
  const labelsData = useLabelsQuery();
  const homeData = useHomeQuery();
  const labels = labelsData.contentfulLabels;
  const home = homeData.contentfulHomePage;
  const image = getImage(home.image.gatsbyImageData as ImageDataLike);

  return (
    <Layout title={home.pageTitle}>
      <div>
        <h1 className="home-heading">{home.heading}</h1>
        <ProjectImage image={image} />
        <p>{home.shortDescription?.shortDescription}</p>
        <PrimaryButton>
          <Link to="/about">{labels.learnMore}</Link>
        </PrimaryButton>
        <SecondaryButton>
          <Link to="/contact">{labels.contactMe}</Link>
        </SecondaryButton>

        <p className="first">HOME</p>
        <p className="second">HOME</p>
        <p className="third">HOME</p>
        <p className="fourth">HOME</p>
        <p className="fifth">HOME</p>
        <p className="sixth">HOME</p>
        <p className="seventh">HOME</p>
        <p className="eighth">HOME</p>
        <p className="nineth">HOME</p>
        <p className="tenth">HOME</p>
        <p className="eleventh">HOME</p>
      </div>
    </Layout>
  );
};

export default IndexPage;

// export const Head: HeadFC = () => <title>Klara Bryntesson | Home</title>;
