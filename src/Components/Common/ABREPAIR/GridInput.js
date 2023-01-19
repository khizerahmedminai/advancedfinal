import React from 'react';
import { useState, useEffect } from 'react';
import { Table, Button, Row, Col, Input } from 'reactstrap';
export default function GridInput(props) {
  const [rows, setRows] = useState([1]);
  const [first, setFirst] = useState(true);
  const [curCol, setCurCol] = useState(0);
  const [curRow, setCurRow] = useState(0);
  const [isMe, setIsMe] = useState(false)
  useEffect(() => {
    if (props?.selVal && isMe) {
      addGridInput(curCol, props?.selVal[props?.selVal.length - 1], curRow);
      console.log(props.gridItems)
      setIsMe(false)
    }
  }, [props?.selVal]);

  function addGridInput(col, value, i) {
    if (first) {
      props?.setGridItems({
        ...props?.gridItems,
        [props?.grid]: {
          ...props?.gridItems[props?.grid],
          [i]: { [col]: value },
        },
      });
      setFirst(false);
    } else {
      props.setGridItems({
        ...props?.gridItems,
        [props?.grid]: {
          ...props?.gridItems[props?.grid],
          [i]: { ...props?.gridItems[props?.grid]?.[i], [col]: value },
        },
      });
    }
  }

  return (
    <>
      <Row>
        <Col xs={props.xs} sm={props.sm} md={props.md} lg={props.lg} xl={props.xl}>
          <Table className='align-middle table-nowrap mb-0'>
            <thead className='table-light'>
              <tr>
                {props.columns.map((column) => {
                  return (
                    <>
                      <th
                        scope='col'
                        style={{ width: (100 / props.columns.length).toString() + '%' }}
                      >
                        {column}
                      </th>
                    </>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                return (
                  <>
                    <tr>
                      {props.columns.map((column, j) => {
                        return (
                          <>
                            <td style={{ padding: 0 }}>
                              {props.types[j] === 'uniqueidentifier' ? (
                                <>
                                  <div style={{ display: 'flex', width: '100%' }}>
                                    <Input
                                      type='text' 
                                      defaultValue={props?.gridItems[props?.grid]?.[i]?.[column]}
                                      className='form-control'
                                      id={column}
                                      disabled
                                    ></Input>
                                    <Button
                                      style={{ padding: '0 .7rem' }}
                                      color='primary'
                                      className='btn btn-primary waves-effect waves-light'
                                      onClick={(e) => {
                                        setIsMe(true)
                                        setCurCol(column);
                                        setCurRow(i);
                                        props.setIsGrid(true);
                                        props.setView('block');
                                        props.setidTable(props.ids(column));
                                        props.setidCol(column);
                                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                      }}
                                    >
                                      <i
                                        style={{ fontSize: '1rem' }}
                                        className=' ri-search-line'
                                      ></i>
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <Input
                                    type={props.types[j]}
                                    defaultValue={props?.gridItems[props?.grid]?.[i]?.[column]}
                                    className='form-control'
                                    name={column}
                                    id={column}
                                    onBlur={(e) => addGridInput(column, e.target.value, i)}
                                  ></Input>
                                </>
                              )}
                            </td>
                          </>
                        );
                      })}
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
          <Row style={{ paddingTop: '1rem' }}>
            <Col xs={6} lg={3}>
              <Button
                onClick={(e) => {
                  setRows([...rows.slice(0, rows.length - 1)]);
                }}
              >
                -
              </Button>
            </Col>
            <Col xs={0} lg={6} />
            <Col xs={6} lg={3} style={{ paddingTop: '1rem' }}>
              <Button
                style={{ float: 'right' }}
                onClick={(e) => {
                  setRows([...rows, 1]);
                }}
              >
                +
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
