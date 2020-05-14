import React from 'react';
import Link from 'next/link';

const Index = () => {
  return (
    <main>
      <Link href='/birds'>
        <a>Birds</a>
      </Link>
      <Link href='/boxes'>
        <a>Boxes</a>
      </Link>
      <Link href='/organism'>
        <a>Organism</a>
      </Link>
    </main>
  );
};

export default Index;
