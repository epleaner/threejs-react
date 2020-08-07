import Helmet from 'react-helmet';

import Ocean from '@components/three/ocean2';
import styles from '@components/three/ocean2/ocean.module.css';

export default () => {
  return (
    <>
      <Helmet>
        <title>ocean</title>
        <meta charset='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0'
        />
      </Helmet>
      <div className={styles.info}>
        left click: forward, right click: backward
      </div>
      <Ocean />
    </>
  );
};
