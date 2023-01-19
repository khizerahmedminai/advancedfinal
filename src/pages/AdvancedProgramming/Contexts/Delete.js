import React from 'react';
import axios from 'axios';
export default function Delete(number, table, refresher, setRefresher) {
  for (let i = 0; i < number.length; i++) {
    axios
      .post('http://localhost:3001/delete', {
        table: table,
        number: number[i],
      })
      .then((res) => {
        console.log(res);
      });
    setRefresher(refresher + 1);
  }
}
