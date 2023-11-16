import React, { useState, useEffect } from 'react';
import TextFileDisplay from '../components/TextFileDisplay';

const Agreement = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('/docs/contract.txt')
      .then(response => response.text())
      .then(data => {
        setData(data);
      });
  }, []);

  return (
    <TextFileDisplay text={data}  />
  );
};

export default Agreement;
