import React from 'react';
import { Input } from 'reactstrap';
import { Link } from 'react-router-dom';
export default function ListContent(props) {
  return props.items?.map((item, index) => {
    if (index >= props.min && index < props.max) {
      return (
        <>
          <tr>
            {props.info?.map((it, i) => {
              if (i === 0) {
                return (
                  <>
                    <th scope='row'>
                      <div className='form-check'>
                        <Input
                          className='form-check-input'
                          type='checkbox'
                          id={item['id']}
                          onChange={(e) => {
                            props.AddNumber(item['id'], e.target.checked);
                          }}
                        />
                        {props._id === 'apartment' ? (
                          <Link to={'/apartments/' + props.table + '/' + item['id']}>
                            {' '}
                            View apartments
                          </Link>
                        ) : (
                          <Link to={'/update/' + props.table + '/' + item['id']}> Edit</Link>
                        )}
                      </div>
                    </th>
                    <td key={item[it['COLUMN_NAME']]}>{item[it['COLUMN_NAME']]}</td>
                  </>
                );
              }
              if (
                it['DATA_TYPE'] === 'date' &&
                item[it['COLUMN_NAME']] !== undefined &&
                item[it['COLUMN_NAME']] !== null
              ) {
                return (
                  <>
                    <td key={item[it['COLUMN_NAME']]}>
                      {item[it['COLUMN_NAME']].substring(0, 10)}
                    </td>
                  </>
                );
              } else {
                return (
                  <>
                    <td key={item[it['COLUMN_NAME']]}>{item[it['COLUMN_NAME']]}</td>
                  </>
                );
              }
            })}
          </tr>
        </>
      );
    }
  });
}
