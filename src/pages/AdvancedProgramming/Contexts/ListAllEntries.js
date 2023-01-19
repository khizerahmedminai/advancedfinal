import React from 'react';
import axios from 'axios';
export default function ListAllEntries(table, setItems) {
  axios
    .post('http://localhost:3001/list', {
      table: table,
    })
    .then((response) => {
      setItems(response['recordset']);
    });
}
