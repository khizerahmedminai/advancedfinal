import React from 'react';
import axios from 'axios';
export default function Excel(gridItems) {
  if (gridItems) {
    Object.entries(gridItems).map((a) => {
      Object.entries(a[1]).map((b) => {
        let Y = {};
        let X = [];
        Object.entries(b[1]).map((c) => {
          Y[c[0]] = c[1];
          X = [...X, c[0]];
        });
        axios.post('http://localhost:3001/create/', {
          dat: Y,
          table: a[0],
          columns: X,
        });
      });
    });
  }
}
