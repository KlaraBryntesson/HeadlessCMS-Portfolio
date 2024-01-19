import * as React from "react";
import { Link, HeadFC, PageProps } from "gatsby";
import { use404Query } from "../helpers/use404Query";
import PrimaryButton from "../components/PrimaryButton";
import { useLabelsQuery } from "../helpers/useLabelsQuery";
import { Labels } from "../helpers/types";
import SearchField from "../components/searchfield";

const NotFoundPage: React.FC<PageProps> = () => {
  const wrongQuery = use404Query();
  const query = wrongQuery.contentful404Page;
  const labelsData = useLabelsQuery();
  const labels: Labels = labelsData.contentfulLabels;
  return (
    <main>
      <div className="wrong-intro-div">
        <div>
          <h1 className="wrong-heading">{query.pageTitle}</h1>
          <p className="wrong-description">{query.description}</p>
          <br />
          <PrimaryButton>
            <Link to="/">{labels.backToHome}</Link>
          </PrimaryButton>
        </div>
        <SearchField />
      </div>
    </main>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
