import React from 'react'
import axios from 'axios';
export default function InsertAuto(table, columnList, dat, tog_errorMessage, tog_successMessage, tog_errorMessage2) {
        let y = 0;
        const list = [];
        for (let i = 0; i < columnList.length; i++) {
          if (dat[columnList[i].COLUMN_NAME]) {
            list[y] = columnList[i].COLUMN_NAME;
            y++;
          }
        }
    
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
      
}
