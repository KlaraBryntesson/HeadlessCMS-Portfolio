import React from "react";
import "../styles.css";
import SearchField from "./searchfield";

const Footer = () => (
  <footer>
    <SearchField />
    <p className="copyright-container">
      Klara Bryntesson © {new Date().getFullYear()}
    </p>
  </footer>
);

export default Footer;
