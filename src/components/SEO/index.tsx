import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface MetaTypes {
  name: string;
  content: string;
}

interface SeoProps {
  description?: string;
  lang?: string;
  meta: MetaTypes[];
  title: string;
  author: string;
}

interface MetaDataTypes {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      author: string;
    };
  };
}

const SEO: React.FC<SeoProps> = ({ description, lang, meta, title, author }) => {
  const { site }: MetaDataTypes = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription: string = description || site.siteMetadata.description;
  const defaultTitle: string = site.siteMetadata?.title;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author || author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;900&family=Lato:wght@300;400;700&family=Rubik:wght@300;400;500;600;700;900&family=Roboto:wght@100;300;400;500;600;700;900&family=Poppins:wght@100;200;300;400;500;600;700;900&display=swap"
        rel="stylesheet"
      ></link>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
    </Helmet>
  );
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  title: `FencyBook Is A Progressive Blogging App`,
  description: ``,
  author: ``,
};

export default SEO;
