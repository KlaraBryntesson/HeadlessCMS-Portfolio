import React, { useState, ChangeEvent } from "react";
import { Index } from "elasticlunr";
import { Link, graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";

interface SearchResult {
  slug: string;
  title: string;
}

const Search: React.FC = () => {
  const data = useStaticQuery(graphql`
    query SearchIndexQuery {
      siteSearchIndex {
        index
      }
    }
  `);

  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  let index: any;

  const getOrCreateIndex = () =>
    index ? index : Index.load(data.siteSearchIndex.index);

  const search = (evt: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = evt.target.value;
    index = getOrCreateIndex();
    setQuery(searchTerm);

    const searchResults = index
      .search(searchTerm, { expand: true })
      .map(
        ({ ref }: { ref: string }) =>
          index.documentStore.getDoc(ref) as SearchResult
      );

    setResults(searchResults);

    if (searchResults.length > 0) {
      setShowResults(true);
    } else {
      setTimeout(() => setShowResults(false), 300);
    }
  };

  return (
    <SearchContainer>
      <label htmlFor="search">Search the site</label>
      <SearchInput id="search" type="text" value={query} onChange={search} />

      <SearchResults isVisible={results.length > 0} showResults={showResults}>
        {results.map((page, index) => (
          <li key={index}>
            <Link to={"/" + page.slug}>{page.title}</Link>
          </li>
        ))}
      </SearchResults>
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  position: relative;
  width: 300px;
`;

const SearchInput = styled.input`
  background-color: var(--color-beige);
  border: none;
  border-radius: 30px;
  height: 40px;
  margin: var(--spacing-2);
  padding: var(--spacing-3);
  width: 300px;
  z-index: 200;

  &:focus {
    border: 1px solid var(--color-orange);
    box-shadow: none;
    outline: none;
  }
`;

const SearchResults = styled.ul<{ isVisible: boolean; showResults: boolean }>`
  position: absolute;
  top: 60%;
  left: 1px;
  width: 298px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 1) 60%
  );
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  padding-top: 2rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  color: var(--color-text-orange);
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) =>
    isVisible ? "translateY(0)" : "translateY(-10px)"};
  transition: opacity 0.3s ease, transform 0.3s ease;
  visibility: ${({ showResults }) => (showResults ? "visible" : "hidden")};

  li {
    margin-left: 1rem;
  }
`;
