import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Search from "./search";

const SearchField = () => {
  const data = useStaticQuery(graphql`
    query SearchIndexQuery {
      siteSearchIndex {
        index
      }
    }
  `);

  return (
    <div>
      <Search searchIndex={data.siteSearchIndex.index} />
    </div>
  );
};

export default SearchField;
