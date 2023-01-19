import React from 'react';
import axios from 'axios';
export default function Submit(
  values,
  num,
  table,
  info,
  tog_errorMessage,
  tog_successMessage,
  tog_errorMessage2,
  setNewid,
) {
  let dat = values;
  const list = [];
  let y = 0;

  for (let i = 0; i < info.length; i++) {
    if (dat[info[i].COLUMN_NAME]) {
      list[y] = info[i].COLUMN_NAME;
      y++;
    }
  }

  if (num) {
    axios
      .post('http://localhost:3001/update/', {
        dat: dat,
        table: table,
        columns: list,
        num: num,
      })
      .then((res) => {
        if (res.number === 102 || res.number === 2627) {
          tog_errorMessage();
        } else if (res.number === 8169) {
          tog_errorMessage2();
        } else if (res.rowsAffected) {
          tog_successMessage();
        }
      });
  } else {
    axios
      .post('http://localhost:3001/create/', {
        dat: dat,
        table: table,
        columns: list,
      })
      .then((res) => {
        if (res.number === 102 || res.number === 2627) {
          tog_errorMessage();
        } else if (res.number === 8169) {
          tog_errorMessage2();
        } else if (res.rowsAffected) {
          tog_successMessage();
        }
        console.log(res);
      })
      .then(() => {
        axios
          .post('http://localhost:3001/pullid/', {
            table: table,
            name: dat['Name'],
          })
          .then((res) => {
            setNewid(res['recordset'][0]['id']);
          });
      });
  }
}
