import React, { useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { ContentfulAbout, Links } from "../helpers/types";
import { useAboutQuery } from "../helpers/useAboutQuery";

const Header = () => {
  const aboutData = useAboutQuery();
  const about: ContentfulAbout = aboutData.contentfulAbout;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          menuLinks {
            name
            link
          }
        }
      }
    }
  `);

  const links: Links[] = data.site.siteMetadata.menuLinks;
  const firstLinks = links.slice(0, 2);
  let secondLinks = links.slice(2);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav>
      <ul className="nav-list">
        {firstLinks.map((link) => (
          <li key={link.link}>
            <Link className="nav-links" to={link.link}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <header className="global-header-container">
        <Link to="/" className="global-header">
          Portfolio
        </Link>
        <p>{about.name}</p>
      </header>
      <ul className="nav-list">
        {secondLinks.map((link) => (
          <li key={link.link}>
            <Link className="nav-links" to={link.link}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mobile-navbar">
        <i
          onClick={toggleMenu}
          className={`bi ${isMenuOpen ? "bi-x-lg" : "bi-list"}`}
        />
        <ul className={`mobile-nav-list ${isMenuOpen ? "open" : ""}`}>
          {links.map((link, index) => (
            <>
              <li key={link.link}>
                <Link className="nav-links" to={link.link}>
                  {link.name}
                </Link>
              </li>
              {index !== links.length - 1 && <hr />}
            </>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
