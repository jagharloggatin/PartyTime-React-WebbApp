import React from 'react';

const MenuItem = ({ url, name }) => {
  return (
    <li>
      <a href={url}>{name}</a>
    </li>
  );
};

export default MenuItem;
