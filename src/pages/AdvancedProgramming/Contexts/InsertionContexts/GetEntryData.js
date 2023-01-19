import React from 'react';
import axios from 'axios';
export default function GetEntryData(table, num, setValues, setRefresher = null) {
  axios
    .post('http://localhost:3001/iteminfo', {
      table: table,
      num: num,
    })
    .then((response) => {
      setValues(response['recordset'][0], setRefresher(1));
    });
}
