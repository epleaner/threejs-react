import React from 'react';
import Link from 'next/link';

const Index = () => {
  return (
    <main className='center-children h-screen grid grid-cols-1 lg:grid-cols-2'>
      <section className='grid grid-rows-2'>
        <h1 className='text-6xl text-gray-400'>3D</h1>
        <nav className='center-children my-4'>
          <Link href='/organism'>
            <a className='card grow'>Organism</a>
          </Link>
          <Link href='/lotus'>
            <a className='card grow'>Lotus</a>
          </Link>
        </nav>
      </section>
      <section className='center-children grid grid-rows-2'>
        <h1 className='text-6xl text-gray-400'>2D</h1>
        <nav className='center-children my-4'>
          <Link href='/sandstone'>
            <a className='card grow'>Sandstone</a>
          </Link>
          <Link href='/waves'>
            <a className='card grow'>Waves</a>
          </Link>
        </nav>
      </section>
    </main>
  );
};

export default Index;
