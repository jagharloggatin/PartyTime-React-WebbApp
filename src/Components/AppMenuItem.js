import React from 'react';

const AppMenuItem = ({ url, name }) => {
  return (
    <li>
      <a href={url}>{name}</a>
    </li>
  );
};

export default AppMenuItem;
