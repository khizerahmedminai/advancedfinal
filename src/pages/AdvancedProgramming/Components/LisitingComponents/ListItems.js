import React from 'react';

export default function ListItems(props) {
  return props.info?.map((item, index) => {
    return (
      <>
        <th
          style={{ cursor: 'pointer' }}
          onClick={(e) =>
            props.sorting(
              item['COLUMN_NAME'],
              props.order,
              props.items,
              props.setItems,
              props.setOrder
            )
          }
          scope='col'
        >
          {item['COLUMN_NAME']}
          <i className='ri-arrow-up-down-line'></i>
        </th>
      </>
    );
  });
}
