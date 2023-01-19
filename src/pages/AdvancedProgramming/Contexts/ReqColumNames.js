import React from 'react';
import axios from 'axios';
export default function ReqColumNames(table, setColumnList) {
  axios
    .post('http://localhost:3001/info', {
      table: table,
    })
    .then((response) => {
      setColumnList(response['recordset']);
    }); 
}
