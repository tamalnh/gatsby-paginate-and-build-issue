import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '../../style';

import Header from '../Header';

interface LayoutProps {
  children: React.ReactNode;
}
interface DataTypes {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const data: DataTypes = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const siteTitle: string = data.site.siteMetadata?.title || `Title`;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header siteTitle={siteTitle} />
      <main>{children}</main>
    </ThemeProvider>
  );
};

export default Layout;
