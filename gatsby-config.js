module.exports = {
  siteMetadata: {
    title: `Project Portfolio`,
    siteUrl: `https://www.yourdomain.tld`,
    menuLinks: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Projects",
        link: "/projects",
      },
      {
        name: "About",
        link: "/about",
      },
      {
        name: "Contact",
        link: "/contact",
      },
    ],
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: "AiSOO3khgETWNzANTBh0oE92HnZwWEjUEzDlJkAhDxA",
        spaceId: "n1i876szb4zn",
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `slug`],
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          ContentfulProjects: {
            title: (node) => node.title,
            slug: (node) => node.slug,
          },
        },
        // Optional filter to limit indexed nodes
        // filter: (node, getNode) => node.frontmatter.tags !== "exempt",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-typescript",
  ],
};

// module.exports = config;
