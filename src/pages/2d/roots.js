import React, { useState } from 'react';
import P5Page from '@components/p5/p5Page';
import Roots from '@components/p5/sandstone/roots';

const RootsPage = () => {
  const [octaves, setOctaves] = useState(4);
  const [fallout, setFallout] = useState(0.25);

  return (
    <>
      <div className='absolute bg-white opacity-25 hover:opacity-100'>
        <label for='octaves' className='mx-2'>
          octaves
        </label>
        <input
          className='w-10 mx-2'
          name='octaves'
          type='number'
          min='1'
          value={octaves}
          onChange={(e) => {
            e.preventDefault();
            setOctaves(e.target.value);
          }}
        />
        <label for='fallout' className='mx-2'>
          fallout
        </label>
        <input
          className='w-10 mx-2'
          name='fallout'
          type='number'
          min='0'
          max='0.5'
          step='0.01'
          value={fallout}
          onChange={(e) => {
            e.preventDefault();
            setFallout(e.target.value);
          }}
        />
      </div>
      <P5Page sketch={Roots} octaves={octaves} fallout={fallout} />
    </>
  );
};

export default RootsPage;
