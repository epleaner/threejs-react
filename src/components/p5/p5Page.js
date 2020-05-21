import React from 'react';
import loadable from '@loadable/component';

const P5Page = (props) => {
  const P5Wrapper = loadable(() => import('react-p5-wrapper'));
  return <P5Wrapper {...props} />;
};

export default P5Page;
