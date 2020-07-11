import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';

import { interval } from 'd3-timer';
import { shuffle } from 'd3-array';

import Letter from '@components/d3/letter';

const Alphabet = () => {
  const sentences = useMemo(
    () =>
      ['sentence 1', 'sentence 2', 'sentence 3', 'sentence 4'].map(
        (sentence) => {
          const letterIndex = {};

          return sentence.split('').map((l) => {
            letterIndex[l] === undefined
              ? (letterIndex[l] = 0)
              : letterIndex[l]++;
            return { letter: l, index: letterIndex[l] };
          });
        }
      ),
    []
  );

  const [alphabet, setAlphabet] = useState([]);

  useEffect(() => {
    let index = 0;
    setAlphabet(sentences[index++ % sentences.length]);

    const intervalId = interval(() => {
      setAlphabet(sentences[index++ % sentences.length]);
    }, 5000);

    return () => intervalId.stop();
  }, [sentences]);

  return (
    <svg width='100%' height='100%' style={{ background: 'papayawhip' }}>
      <g style={{ transform: 'translate(10%, 50%)' }}>
        <TransitionGroup component='g' enter={true} exit={true}>
          {alphabet.map(({ letter, index }, i) => (
            <Letter key={`${letter}-${index}`} letter={letter} index={i} />
          ))}
        </TransitionGroup>
      </g>
    </svg>
  );
};

Alphabet.propTypes = {};

export default Alphabet;
