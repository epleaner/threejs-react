import React from 'react';
import Link from 'next/link';

const Index = () => {
  const projects2d = [
    'sandstone',
    'yarn',
    'roots',
    'treebeard',
    'waves',
    'introvert',
    'lines',
  ];
  const projects3d = ['pacific', 'organism', 'lotus', 'juniper'];
  return (
    <>
      <main className='bg-gray-900 min-h-screen grid grid-cols-1 lg:grid-cols-2'>
        <section className='lg:mx-10 mx-4'>
          <h1 className='text-6xl text-gray-400'>3D</h1>
          <nav className='grid grid-cols-2 mt-4'>
            {projects3d.map((project) => (
              <Link key={project} href={`/3d/${project}`}>
                <a className='card grow'>{project}</a>
              </Link>
            ))}
          </nav>
        </section>
        <section className='lg:mx-10 mx-4'>
          <h1 className='text-6xl text-gray-400'>2D</h1>
          <nav className='grid grid-cols-2 mt-4'>
            {projects2d.map((project) => (
              <Link key={project} href={`/2d/${project}`}>
                <a className='card grow'>{project}</a>
              </Link>
            ))}
          </nav>
        </section>
        <footer className='mb-1 center-children w-screen'>
          <span className='text-gray-600 text-sm align-middle'>
            made by{' '}
            <a
              className='text-gray-600 text-sm hover:text-gray-200 mr-1'
              href='https://elipleaner.com'>
              eli
            </a>{' '}
            🐙
          </span>
        </footer>
      </main>
    </>
  );
};

export default Index;
