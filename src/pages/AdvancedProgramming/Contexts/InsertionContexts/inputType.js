import React from 'react';

export default function InputType(x) {
  const obj = {
    date: 'date',
    int: 'number',
    varchar: 'text',
    text: 'textarea',
    bit: 'checkbox',
    float: 'number',
    nvarchar: 'text',
    uniqueidentifier: 'text',
  };
  return obj[x];
}
