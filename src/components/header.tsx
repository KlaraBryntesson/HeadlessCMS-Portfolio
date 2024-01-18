import React, { useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { Links } from "../helpers/types";

const Header = () => {
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
        {/* Ska vara en logo som går till startsidan */}
        <span className="global-header">Portfolio</span>
        <p>Klara Bryntesson</p>
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
              <li>
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
