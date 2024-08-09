import * as React from "react";
import { Link, HeadFC, PageProps } from "gatsby";
import { use404Query } from "../helpers/use404Query";
import PrimaryButton from "../components/PrimaryButton";
import { useLabelsQuery } from "../helpers/useLabelsQuery";
import { Labels } from "../helpers/types";
import styled from "styled-components";
import Search from "../components/search";

const NotFoundPage: React.FC<PageProps> = () => {
  const wrongQuery = use404Query();
  const query = wrongQuery.contentful404Page;
  const labelsData = useLabelsQuery();
  const labels: Labels = labelsData.contentfulLabels;
  return (
    <main>
      <StyledDiv>
        <div>
          <StyledHeading>{query.pageTitle}</StyledHeading>
          <StyledParagraph>{query.description}</StyledParagraph>
          <br />
          <PrimaryButton type="button">
            <Link to="/">{labels.backToHome}</Link>
          </PrimaryButton>
        </div>
        <Search />
      </StyledDiv>
    </main>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: space-between;
  padding-top: var(--spacing-32);

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledHeading = styled.h1`
  font-size: var(--fontSize-11);
  position: static;
`;

const StyledParagraph = styled.p`
  font-size: var(--fontSize-3);
`;
