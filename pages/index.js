import React from 'react';
import Link from 'next/link';

const Index = () => {
  return (
    <main className='center-children h-screen'>
      <Link href='/organism'>
        <a className='card grow'>Organism</a>
      </Link>
      <Link href='/lotus'>
        <a className='card grow'>Lotus</a>
      </Link>
    </main>
  );
};

export default Index;
