import React, { useState, ChangeEvent } from "react";
import { Index } from "elasticlunr";
import { Link } from "gatsby";
import styled from "styled-components";
// import lunr from 'lunr';

// Search component

interface SearchResult {
  // id: string;
  slug: string;
  title: string;
}

interface SearchProps {
  searchIndex: any; // Replace 'any' with the actual type of your searchIndex
}

const Search: React.FC<SearchProps> = ({ searchIndex }) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  let index: any; // Replace 'any' with the actual type of your lunr index

  console.log(searchIndex);

  const getOrCreateIndex = () => (index ? index : Index.load(searchIndex));

  const search = (evt: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = evt.target.value;
    index = getOrCreateIndex();
    setQuery(searchTerm);
    console.log(index);
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
            {/* {": " + page.tags.join(",")} */}
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
