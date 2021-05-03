import React from 'react';

interface HeaderProps {
  siteTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ siteTitle }) => (
  <header>
    <div>
      <h1>{siteTitle}</h1>
    </div>
  </header>
);

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
