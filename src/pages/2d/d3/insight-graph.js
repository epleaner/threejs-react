import { useState, useCallback } from 'react';

import InsightGraph from '@components/d3/insightGraph';
import WebSocketListener from '@components/d3/insightGraph/webSocketListener';

const InsightGraphPage = () => {
  const [words, setWords] = useState([]);

  const addWord = useCallback((newWord) => {
    setWords((prevWords) => {
      const newState = [...prevWords];
      newState.push(newWord);
      return newState;
    });
  }, []);

  return (
    <>
      <WebSocketListener onMessage={addWord} />
      <InsightGraph words={words} />
    </>
  );
};

export default InsightGraphPage;
