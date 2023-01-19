import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, Col, Container, Input, Label, Row, Table } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import UiContent from '../../../Components/Common/UiContent';
import { Link, useParams } from 'react-router-dom';
import {
  DefaultTables,
  StrippedRow,
  TablesColors,
  HoverableRows,
  CardTables,
  ActiveTables,
  BorderedTables,
  TablesBorderColors,
  TablesWithoutBorders,
  SmallTables,
  TableHead,
  TableFoot,
  Captions,
  TableNesting,
  Variants,
  VerticalAlignment,
  ResponsiveTables,
} from './BasicTablesCode';

//Import images
import avtarImage1 from '../../../assets/images/users/avatar-1.jpg';
import avtarImage3 from '../../../assets/images/users/avatar-3.jpg';
import avtarImage4 from '../../../assets/images/users/avatar-4.jpg';
import avtarImage5 from '../../../assets/images/users/avatar-5.jpg';
import avtarImage6 from '../../../assets/images/users/avatar-6.jpg';
import { tab } from '@testing-library/user-event/dist/tab';
import PropertiesColor from '../Contexts/InsertionContexts/PropertiesColor';

const idList = (props) => {
  const [items, setItems] = useState([]);
  const [info, setInfo] = useState([]);
  const [order, setOrder] = useState('ASC');

  const sorting = (col) => {
    if (order === 'ASC') {
      const sorted = [...items].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setItems(sorted);
      setOrder('DESC');
    }
    if (order === 'DESC') {
      const sorted = [...items].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setItems(sorted);
      setOrder('ASC');
    }
  };

  const table = props.table;
  let number = [];
  const [focus, setFocus] = useState(false)
  useEffect(() => {
    axios
      .post('http://localhost:3001/list', {
        table: table,
      })
      .then((response) => {
        setItems(response['recordset']);
      }).then(() => {
        if(props.col === 'Apartmentid'){
          if(props?.values['Buildingid']){
            let filtered = items.filter(item => item['Buildingid'] === props?.values['Buildingid'])
            setItems(filtered)
          }
        }
      })
  }, [table, focus]);
  useEffect(() => {
    if(props.col === 'Apartmentid'){
      if(props?.values['Buildingid']){
        let filtered = items.filter(item => item['Buildingid'] === props?.values['Buildingid'])
        setItems(filtered)
      }
    }
  }, [props?.col, props?.values?.Buildingid])

  useEffect(() => {
    try {
      axios
        .post('http://localhost:3001/info', {
          table: table,
        })
        .then((response) => {
          setInfo(response['recordset']);
        });
    } catch (e) {
      console.log(e);
    }
  }, [table]);

  function Delete() {
    for (let i = 0; i < number.length; i++) {
      console.log(number[i]);
      axios
        .post('http://localhost:3001/delete', {
          table: table,
          number: number[i],
        })
        .then((res) => {
          console.log(res);
        });
    }
    window.location.reload();
  }

  function ListItems() {
    return info?.map((item, index) => {
      if (
        item['COLUMN_NAME'].includes('id') === false &&
        item['COLUMN_NAME'].includes('GUID') === false
      ) {
        return (
          <>
            <th
              style={{ cursor: 'pointer' }}
              onClick={(e) => sorting(item['COLUMN_NAME'])}
              scope='col'
            >
              {item['COLUMN_NAME']}
              <i className='ri-arrow-up-down-line'></i>
            </th>
          </>
        );
      }
    });
  }

  function AddNumber(num, chk) {
    if (chk) {
      number.push(num);
    } else {
      let index = number.indexOf(num);
      number.splice(index, 1);
    }
  }

  function AddAll(num, chk) {
    if (chk) {
      for (let i = 0; i < num.length; i++) {
        number.push(num[i]['Number']);
        document.getElementById(num[i]['Number']).checked = true;
      }
    } else {
      for (let i = 0; i < num.length; i++) {
        document.getElementById(num[i]['Number']).checked = false;
      }
      number = [];
    }
  }
  const [selId, setSelId] = useState('')
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  function clean(obj){
    if(obj === null || obj === undefined || obj === '' || obj === ' '){
      setFiltered([])
    }
  }
  useEffect(() => {
    clean(search)
    const filteredArray = items.filter(obj => {
      return Object.values(obj).some(val => val === search);
    });
    setFiltered(filteredArray);
  }, [search]);
  function ListContent() {
    let results = search ? filtered : items
    return results?.map((item, index) => {
      return (
        <>
          <tr style={props?.isAps ? {backgroundColor: PropertiesColor(item?.['Number'])?.[0]} : null }>
            {info?.map((it, i) => {
              if (it['COLUMN_NAME'].includes('id') === false) {
                if (i === 0) {  
                  return (
                    <>
                      <th scope='row'>
                        <div className='form-check'>
                          <button
                            type='button'
                            className='btn btn-success btn-icon waves-effect waves-light'
                            id={item[it['COLUMN_NAME']]}
                            onClick={(e) => {
                              if (props.isGrid) {
                                props?.setSelVal([...props.selVal, item['id']]);
                                props?.setView('none');
                              }
                              if (props.isAps) {
                                props?.setProperty(item);
                                setSelId(index)
                              } else {
                                props?.setData(props.col, item['id']);
                                item['Name']
                                  ? props.setAccounts(props.col, item['Name'])
                                  : props.setAccounts(props.col, item['Number']); 
                                document.getElementById(props.col).scrollIntoView();
                                props?.setView('none');
                                console.log(item['id'])
                              }
                            }}
                          >
                            {props?.isAps ? (<>
                              <i>Select</i>
                            </>) : 
                            <i className=' ri-add-line'></i>
                            }
                          </button>
                          
                          <Label
                            className='form-check-label'
                            htmlFor='responsivetableCheck01'
                          ></Label>
                        </div>
                      </th>
                      <td>{item[it['COLUMN_NAME']]}</td>
                    </>
                  );
                }
                if (
                  it['DATA_TYPE'] === 'date' &&
                  item[it['COLUMN_NAME']] !== null &&
                  item[it['COLUMN_NAME']] !== undefined
                ) {
                  return (
                    <>
                      <td>{item[it['COLUMN_NAME']].substring(0, 10)}</td>
                    </>
                  );
                } else {
                  return (
                    <>
                      <td>{item[it['COLUMN_NAME']]}</td>
                    </>
                  );
                }
              }
            })}
          </tr>
        </>
      );
    });
  }
  return (
    <div>

    <Container
      style={{
        // zIndex: '3',
        display: props.displayProperty,
      }}
      fluid
    >
      <Row>
        <Col xl={12}>
          <Card>
            <PreviewCardHeader title={table} />
            <CardBody>
              <div className='live-preview'>
                <div className='table-responsive' style={{height: '40rem'}}>
                  <Link
                    target='_blank'
                    to={'/add/' + table + '/id'}
                    className='btn btn-primary waves-effect waves-light m-1'
                  >
                    Add new
                  </Link>
                      <div style={{display: 'inline-flex'}} className='m-1'>
                        <div className='search-box'>
                          <div className='position-relative'>
                            <Input
                              type='text'
                              className='form-control rounded-pill m-1'
                              placeholder='Search...'
                              onChange={(e) => {
                                setSearch(e.target.value);
                              }}
                            />
                            
                            <i className='bx bx-search-alt search-icon'></i>
                          </div>
                        </div>
                      </div>
                  <Table className='align-middle table-nowrap mb-0' style={{overflowY: 'scroll'}}>
                    <thead className='table-light'>
                      <tr>
                        <th scope='col' style={{ width: '42px' }}>
                          <div className='form-check'>
                            <Label className='form-check-label' for='responsivetableCheck'></Label>
                          </div>
                        </th>
                        <ListItems />
                      </tr>
                    </thead>
                    <tbody>
                      <ListContent />
                    </tbody>
                  </Table>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

      </Row>
    </Container>

    </div>
  );
};

export default idList;
