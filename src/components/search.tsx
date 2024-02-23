import React, { useState, ChangeEvent } from "react";
import { Index, SerialisedIndexData } from "elasticlunr";
import { Link } from "gatsby";
import styled from "styled-components";

interface SearchResult {
  slug: string;
  title: string;
}

interface SearchProps {
  searchIndex: SerialisedIndexData<Number>;
}

const Search: React.FC<SearchProps> = ({ searchIndex }) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  let index: any;

  const getOrCreateIndex = () => (index ? index : Index.load(searchIndex));

  const search = (evt: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = evt.target.value;
    index = getOrCreateIndex();
    setQuery(searchTerm);
    setResults(
      index
        .search(searchTerm, { expand: true })
        .map(
          ({ ref }: { ref: string }) =>
            index.documentStore.getDoc(ref) as SearchResult
        )
    );
  };

  return (
    <div className="search-container">
      <label htmlFor="search">Search the site</label>
      <SearchInput id="search" type="text" value={query} onChange={search} />

      <ul>
        {results.map((page, index) => (
          <li key={index}>
            <Link to={"/" + page.slug}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;

const SearchInput = styled.input`
  border: none;
  border-radius: 30px;
  height: 40px;
  margin: var(--spacing-2);
  padding: var(--spacing-3);
  width: 300px;

  &:focus {
    border: 1px solid var(--color-orange);
    box-shadow: none;
    outline: none;
  }
`;
