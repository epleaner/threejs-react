import React from 'react';
import loadable from '@loadable/component';

import SandstoneParticles from '@components/p5/sandstone';

const SandStonePage = () => {
  const P5Wrapper = loadable(() => import('react-p5-wrapper'));
  return <P5Wrapper sketch={SandstoneParticles} />;
};
export default SandStonePage;
