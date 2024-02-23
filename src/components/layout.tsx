import * as React from "react";
import Footer from "./footer";
import { Helmet } from "react-helmet";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./header";

interface LayoutProps {
  title?: string;
  metaData: string;
  header?: boolean;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div>
      <Helmet>
        <title>{`Klara Bryntesson | ${props.title}`}</title>
        <meta name="description" content={props.metaData} />
      </Helmet>
      <Header />
      {props.title && props.title !== "Home" && !props.header && (
        <h1>{props.title}</h1>
      )}
      {props.header && <h1 className="project-header">{props.title}</h1>}
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
