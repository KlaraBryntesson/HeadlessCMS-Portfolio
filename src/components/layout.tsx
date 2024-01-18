import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Footer from "./footer";
import { Helmet } from "react-helmet";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./header";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    // <div className="global-wrapper" data-is-root-path={isRootPath}>
    <div>
      <Helmet>
        <title>{`Klara Bryntesson | ${props.title}`}</title>
      </Helmet>
      <Header />
      {props.title && props.title !== "Home" && <h1>{props.title}</h1>}
      <main>{props.children}</main>
      <Footer />
    </div>
    // </div>
  );
};

export default Layout;
