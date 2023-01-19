import React from 'react';
import { Label, Col, Input } from 'reactstrap';
export default function GenerateColumns(props) {
  const F = props.Field;
  
  return props.columnList.map((item, index) => {
      return (
        <>
          <F colname={item['COLUMN_NAME']}/>
        </>
      );
    }
  );
}
