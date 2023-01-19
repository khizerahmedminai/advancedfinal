import React from 'react';

export default function inputSize(x) {
  const size = {
    date: '4',
    number: '4',
    text: '4',
    checkbox: '1',
    textarea: '4',
  };
  return size[x];
}
