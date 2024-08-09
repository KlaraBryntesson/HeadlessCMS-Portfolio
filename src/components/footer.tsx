import React from "react";
import "../styles.css";
import { useAboutQuery } from "../helpers/useAboutQuery";
import { ContentfulAbout } from "../helpers/types";
import Search from "./search";

const Footer = () => {
  const aboutData = useAboutQuery();
  const about: ContentfulAbout = aboutData.contentfulAbout;
  return (
    <footer>
      <Search />
      <p className="copyright-container">
        {`${about.name} © ${new Date().getFullYear()}`}
      </p>
    </footer>
  );
};

export default Footer;
