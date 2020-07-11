import React, { useState, useEffect } from 'react';

import Alphabet from '@components/d3/alphabet';

const AlphabetPage = () => {
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState({});
  const [poem, setPoem] = useState();

  const getAuthors = async () => {
    const res = await fetch('https://poetrydb.org/author');
    const { authors } = await res.json();
    setAuthors(authors);
  };

  const getAuthorPoems = async (authors) => {
    const author = authors[Math.floor(Math.random() * authors.length + 1)];
    const res = await fetch(`https://poetrydb.org/author/${author}`);
    const json = await res.json();
    setAuthor({ name: author, poems: json });
  };

  useEffect(() => {
    (async () => await getAuthors())();
  }, []);

  useEffect(() => {
    if (authors.length) {
      (async () => await getAuthorPoems(authors))();
    }
  }, [authors]);

  useEffect(() => {
    if (author.poems) {
      setPoem(
        author.poems[Math.floor(Math.random() * author.poems.length + 1)]
      );
    }
  }, [author]);

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-purple-200'>
      {poem ? <Alphabet poem={poem} /> : <span>loading...</span>}
    </div>
  );
};

export default AlphabetPage;
