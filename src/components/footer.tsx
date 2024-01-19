import React from "react";
import "../styles.css";
import SearchField from "./searchfield";
import { useAboutQuery } from "../helpers/useAboutQuery";
import { ContentfulAbout } from "../helpers/types";

const Footer = () => {
  const aboutData = useAboutQuery();
  const about: ContentfulAbout = aboutData.contentfulAbout;
  return (
    <footer>
      <SearchField />
      <p className="copyright-container">
        `${about.name} © ${new Date().getFullYear()}`
      </p>
    </footer>
  );
};

export default Footer;
