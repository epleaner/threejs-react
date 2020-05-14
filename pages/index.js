import React from 'react';
import Link from 'next/link';

const Index = () => {
  return (
    <main className='center-children h-screen'>
      <Link href='/organism'>
        <a className='card grow'>Organism</a>
      </Link>
    </main>
  );
};

export default Index;
