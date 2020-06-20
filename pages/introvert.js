import React, { useState } from 'react';
import P5Page from '@components/p5/p5Page';
import Introvert from '@components/p5/introvert';

const IntrovertPage = () => {
  const [numSegments, setNumSegments] = useState(15);
  const [segLength, setSegLength] = useState(40);
  const [randomize, setRandomize] = useState(false);

  return (
    <>
      <div className='absolute w-full bg-white opacity-0 hover:opacity-100'>
        <label htmlFor='numSegments' className='mx-2'>
          # segments: {numSegments}
        </label>
        <input
          className='w-50 mx-2'
          name='numSegments'
          type='range'
          min='1'
          max='20'
          value={numSegments}
          onChange={(e) => {
            e.preventDefault();
            setNumSegments(e.target.value);
          }}
        />
        <label htmlFor='SegLength' className='mx-2'>
          segment length: {segLength}
        </label>
        <input
          className='w-50 mx-2'
          name='segLength'
          type='range'
          min='1'
          max='100'
          value={segLength}
          onChange={(e) => {
            e.preventDefault();
            setSegLength(e.target.value);
          }}
        />
        {false && (
          <>
            <label htmlFor='randomize' className='mx-2'>
              randomize
            </label>
            <input
              className='w-50 mx-2'
              name='randomize'
              type='checkbox'
              value={randomize}
              onChange={(e) => {
                setRandomize((randomize) => !randomize);
              }}
            />
          </>
        )}
      </div>
      <P5Page
        sketch={Introvert}
        numSegments={numSegments}
        segLength={segLength}
        randomize={randomize}
      />
    </>
  );
};

export default IntrovertPage;
