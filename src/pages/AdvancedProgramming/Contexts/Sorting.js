import React from 'react';

export default function Sorting(col, order, items, setItems, setOrder) {
  if (order === 'ASC') {
    const sorted = [...items].sort((a, b) => (a[col] > b[col] ? 1 : -1));
    setItems(sorted);
    setOrder('DESC');
  }
  if (order === 'DESC') {
    const sorted = [...items].sort((a, b) => (a[col] < b[col] ? 1 : -1));
    setItems(sorted);
    setOrder('ASC');
  }
}
