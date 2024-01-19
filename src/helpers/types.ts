import { IGatsbyImageData } from "gatsby-plugin-image";

export interface Image {
  url: string;
}

export interface GatsbyImageType {
  gatsbyImageData: IGatsbyImageData | undefined;
  title?: string;
}

export interface LongDescription {
  raw: string;
}

export interface ShortDescription {
  shortDescription: string;
}

export interface Description {
  description: string;
}

export interface Project {
  category: string[];
  created: String;
  image: GatsbyImageType;
  images: GatsbyImageType[];
  longDescription: LongDescription;
  shortDescription: ShortDescription;
  slug: string;
  techStack: String[];
  title: string;
  url: string;
  metaData: string;
  participants?: string[];
}

export interface AllContentfulProjects {
  nodes: Project[];
}

export interface ContentfulProjectPage {
  pageTitle: string;
  projectIntro: ProjectIntro;
  metaData: string;
}

export interface ProjectIntro {
  projectIntro: string;
}

export interface Data {
  allContentfulProjects: AllContentfulProjects;
  contentfulProjectPage: ContentfulProjectPage;
}

export interface AboutData {
  contentfulAbout: ContentfulAbout;
  allContentfulEducation: AllContentfulEducation;
}

export interface AllContentfulEducation {
  nodes: Education[];
}

export interface Education {
  title: string;
  location: string;
  description: Description;
  fromDate: string;
  toDate?: string;
  isEducation: boolean;
}

export interface ContentfulAbout {
  pageTitle: string;
  name?: String;
  age?: String;
  description?: LongDescription;
  email?: String;
  gitHub?: String;
  images?: GatsbyImageType[];
  linkedIn?: String;
  biography?: String;
  skills?: String[];
  metaData: string;
}

export interface ContefulContact {
  pageTitle: string;
  shortDescription: ShortDescription;
  email: string;
  github: string;
  linkedIn: string;
  metaData: string;
}

export interface ContentfulHomePage {
  pageTitle: string;
  heading: String;
  image: GatsbyImageType;
  shortDescription?: ShortDescription;
  metaData: string;
}

export interface HomeData {
  contentfulHomePage: ContentfulHomePage;
}

export interface Links {
  name: string;
  link: string;
}

export interface Labels {
  visitSite: string;
  searchSite: string;
  readMore: string;
  learnMore: string;
  explore: string;
  contactMe: string;
  backToHome: string;
  collaborators: string;
}
