import React from 'react';

const CardLayout = prop => {
  const Mystyle = {
    display: 'Flex'
  };

  return <div style={Mystyle}>{prop.children}</div>;
};

export default CardLayout;
