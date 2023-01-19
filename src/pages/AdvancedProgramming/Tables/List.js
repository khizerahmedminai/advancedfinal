import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, Col, Container, Input, Label, Row, Table, Button } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import UiContent from '../../../Components/Common/UiContent';
import { Link, useParams } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import {
  DefaultTables,
  StrippedRow,
  TablesColors,
  HoverableRows,
  CardTables,
  ActiveTables,
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
import ListContent from '../Components/LisitingComponents/ListContent';
import ListItems from '../Components/LisitingComponents/ListItems';
import Delete from '../Contexts/Delete';
import { preventDefault } from '@fullcalendar/react';
import ReqColumNames from '../Contexts/ReqColumNames';
import Sorting from '../Contexts/Sorting';
import ListAllEntries from '../Contexts/ListAllEntries';
import Filter from '../Components/LisitingComponents/Filter';
const List = () => {
  const [items, setItems] = useState([]);
  const [info, setInfo] = useState([]);
  const [order, setOrder] = useState('ASC');
  const [deleteModal, setDeleteModal] = useState(false);
  const [refresher, setRefresher] = useState(1);
  const [temp, setTemp] = useState(0);
  const { _id } = useParams();
  const table = _id !== 'apartment' ? _id : 'Building';
  const [number, setNumber] = useState([]);
  const [listnumber, setListnumber] = useState(10);
  const [page, setPage] = useState(1);
  const [filterObj, setFilterObj] = useState({});
  const [filterView, setFilterView] = useState('none');
  const [view, setView] = useState('none');
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    ListAllEntries(table, setItems);
    ListAllEntries(table, setFiltered);
    console.log('items are: ',items)
  }, [table, refresher]);
  
  useEffect(() => {
    let limit = Math.ceil(items.length / listnumber);
    let arr = [];
    for (let i = 0; i < limit; i++) {
      arr.push(i);
    }
    setPages(arr);
  }, [items, listnumber]);
  useEffect(() => {
    ReqColumNames(table, setInfo);
  }, [table, refresher]);

  function AddNumber(num, chk) {
    if (chk) {
      setNumber((number) => [...number, num]);
      document.getElementById(num).checked = true;
    } else {
      let index = number.indexOf(num);
      number.splice(index, 1);
      document.getElementById(num).checked = false;
    }
  }
  
  function AddAll(num, chk) {
    if (chk) {
      for (let i = 0; i < num.length; i++) {
        setNumber((number) => [...number, num[i]['id']]);
        document.getElementById(num[i]['id']).checked = true;
      }
    } else {
      for (let i = 0; i < num.length; i++) {
        document.getElementById(num[i]['id']).checked = false;
      }
      setNumber([]);
    }
  }
  let [pages, setPages] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);
  let filteredArray = items.filter(obj => {
    return Object.entries(filterObj).every(([key, value]) => {
      return key in obj && obj[key] === value;
    });
  });
  function clean(obj) {
    if(typeof obj === 'object'){

      for (let propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
          delete obj[propName];
        }
      }
    }
    else if(typeof obj === 'string'){
      if(obj === null || obj === undefined || obj === ''){
        setFilterObj({})
      }
    }
  }
  
  useEffect(()=>{
    clean(filterObj)
    filteredArray = items.filter(obj => {
      return Object.entries(filterObj).every(([key, value]) => {
        return key in obj && obj[key] === value;
      });
    });
    setFiltered(filteredArray)
  }, [filterObj])

  

  const totals = filtered.reduce((acc, obj) => {
    // iterate over each key in the object
    for (const key in obj) {
      // if the key doesn't exist in the accumulator object,
      // initialize it to 0
      if (!acc[key]) {
        acc[key] = 0;
      }
      // add the value for this key to the accumulator
      acc[key] += obj[key];
    }
    return acc;
  }, {});
  const totalsArr = Object.entries(totals);
  document.title = _id === 'apartment' ? 'Select apartment building' : 'List ' + table;
  const [search, setSearch] = useState('');
  useEffect(() => {
    clean(search)
    const filteredArray = items.filter(obj => {
      return Object.values(obj).some(val => val === search);
    });
    setFiltered(filteredArray);
  }, [search]);
  return (
    <React.Fragment>
      <Modal
        id='error'
        tabIndex='-1'
        isOpen={deleteModal}
        toggle={() => {
          setDeleteModal(false);
        }}
        centered
      >
        <ModalBody className='text-center p-5'>
          <div className='text-end'>
            <button
              type='button'
              onClick={() => {
                setDeleteModal(false);
              }}
              className='btn-close text-end'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='mt-2'>
            <script src='https://cdn.lordicon.com/qjzruarw.js'></script>
            <lord-icon
              src='https://cdn.lordicon.com/kfzfxczd.json'
              trigger='hover'
              style={{ width: '150px', height: '150px' }}
            ></lord-icon>
            <h4 className='mb-3 mt-4'>Confirm</h4>
            <p className='text-muted fs-15 mb-4'>
              Please confirm that you want to delete the selected items.
            </p>
          </div>
          <div className='hstack gap-2 justify-content-center'>
            <Button
              className='btn btn-secondary'
              onClick={() => {
                setDeleteModal(false);
              }}
            >
              Return
            </Button>
            <Button
              className='btn btn-danger'
              onClick={(e) => {
                e.preventDefault();
                Delete(number, table, refresher, setRefresher);
                setDeleteModal(false);
              }}
            >
              Delete
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <UiContent />
      <div className='page-content'>
      {view === 'block' ? (
          <i
            onClick={(e) => setView('none')}
            style={{ fontSize: '2rem', cursor: 'pointer' }}
            className='ri-close-line'
          ></i>
        ) : null}
        <Container fluid>
          <Row>

        <Filter view={view} setView={setView} filterObj={filterObj} setFilterObj={setFilterObj} setFilterView={setFilterView} filterView={filterView} columnList={info} items={items} />
            <Col xl={filterView === 'flex' ? 10 : 12}>
              <Card>
                <PreviewCardHeader title={table} />
                
                <CardBody>
                  <div className='live-preview'>
                    
                    <div className='table-responsive'>
                      <Link
                        to={'/create/' + table}
                        className='btn btn-primary waves-effect waves-light m-2'
                      >
                        Add new
                      </Link>

                      <Button
                        className='btn-icon btn btn-danger m-2'
                        onClick={(e) => {
                          e.preventDefault();
                          setDeleteModal(true);
                        }}
                      >
                        <i className='ri-delete-bin-5-line'></i>
                      </Button>
                      <Button className='btn btn-success m-2' onClick={(e) => {e.preventDefault(); setFilterView(filterView === 'flex' ? 'none' : 'flex');}}>Filter</Button>
                      {/* search field that will search all columns */}
                      <div style={{display: 'inline-flex'}}>
                        <div className='search-box'>
                          <div className='position-relative'>
                            <Input
                              type='text'
                              className='form-control rounded-pill'
                              placeholder='Search...'
                              onChange={(e) => {
                                setSearch(e.target.value);
                              }}
                            />
                            <i className='bx bx-search-alt search-icon'></i>
                          </div>
                        </div>
                      </div>

                      <Table className='align-middle table-nowrap mb-0'>
                        <thead className='table-light'>
                          <tr>
                            <th scope='col' style={{ width: '42px' }}>
                              <div className='form-check'>
                                <Input
                                  className='form-check-input'
                                  type='checkbox'
                                  defaultValue=''
                                  id='responsivetableCheck'
                                  onClick={(e) => {
                                    AddAll(items, e.target.checked);
                                  }}
                                />
                                <Label
                                  className='form-check-label'
                                  for='responsivetableCheck'
                                ></Label>
                              </div>
                            </th>
                            <ListItems
                              min={min}
                              max={max}
                              info={info}
                              sorting={Sorting}
                              order={order}
                              setOrder={setOrder}
                              items={items}
                              setItems={setItems}
                            />
                          </tr>
                        </thead>
                        <tbody>
                          {temp !== refresher ? (
                            <>{setTemp(refresher)}</>
                          ) : (
                            <ListContent
                              min={min}
                              max={max}
                              _id={_id}
                              items={filtered ? filtered : items}
                              info={info}
                              table={table}
                              AddNumber={AddNumber}
                            />
                          )}
                          
                        </tbody>
                        
                      </Table>
                    </div>
                    <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group" role="group" aria-label="First group">
                    {page > 1 ? (<button
                    className="btn btn-outline-primary waves-effect waves-light"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setMin((page-2) * listnumber);
                                    setMax((page-2) * listnumber + 10);
                                    setPage(page-1)
                                  }}
                                    > {'<'} </button>) : <button
                                    className="btn btn-outline-primary waves-effect waves-light"
                                    > {'<'} </button>}
                                    </div>
                                    <div style={{padding:'0 .1rem'}}></div>
                                    <div className="btn-group" role="group" aria-label="Second group">
                                    {page > 2 && pages.length > 5 ? (<>
                      <button
                      className="btn btn-outline-primary waves-effect waves-light"
                            onClick={(e) => {
                              e.preventDefault();
                              setMin(parseInt(0));
                              setMax(listnumber);
                              setPage(1)
                            }}
                          >
                            {1}
                          </button>
                          <div style={{padding:'0 .5rem'}}></div>
                    </>) : null }
                    {pages.map((i) => {
                      if(pages.length > 5){
                        if(i >= page-2 && i < page+4){
                          if (i === 0) {
                          return (
                              <>
                                <button
                                className={page === i+1 ? "btn btn-primary waves-effect waves-light" : "btn btn-outline-primary waves-effect waves-light"}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setMin(0);
                                    setMax(listnumber);
                                    setPage(i+1)
                                  }}
                                    >
                                  {parseInt(i) + 1}
                                </button>
                              </>
                            );
                          } else {
                            return (
                              <>
                                <button
                                className={page === i+1 ? "btn btn-primary waves-effect waves-light" : "btn btn-outline-primary waves-effect waves-light"}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setMin(parseInt(i) * listnumber);
                                    setMax(parseInt(i) * listnumber + 10);
                                    setPage(i+1)
                                  }}
                                >
                                  {parseInt(i) + 1}
                                </button>
                              </>
                            );
                          }
                        }
                      }
                      else{
                      if (i === 0) {
                      return (
                          <>
                            <button
                            className={page === i+1 ? "btn btn-primary waves-effect waves-light" : "btn btn-outline-primary waves-effect waves-light"}
                              onClick={(e) => {
                                e.preventDefault();
                                setMin(0);
                                setMax(listnumber);
                                setPage(i+1)
                              }}
                                >
                              {parseInt(i) + 1}
                            </button>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <button
                            className="btn btn-outline-primary waves-effect waves-light"
                              onClick={(e) => {
                                e.preventDefault();
                                setMin(parseInt(i) * listnumber);
                                setMax(parseInt(i) * listnumber + 10);
                                setPage(i+1)
                              }}
                            >
                              {parseInt(i) + 1}
                            </button>
                          </>
                        );
                      }
                    }
                    
                    })}

                    
                    {page !== pages.length && pages.length > 5 ? (<>
                    <div style={{padding:'0 .5rem'}}></div>
                      <button
                      className="btn btn-outline-primary waves-effect waves-light"
                            onClick={(e) => {
                              e.preventDefault();
                              setMin(parseInt(pages.length-1) * listnumber);
                              setMax(parseInt(pages.length-1) * listnumber + 10);
                              setPage(pages.length)
                            }}
                          >
                            {pages.length}
                          </button>
                    </>) : null }
                    </div>
                    <div style={{padding:'0 .1rem'}}></div>
                    <div className="btn-group" role="group" aria-label="Third group">
                    {page < pages.length ? (<button
                    className="btn btn-outline-primary waves-effect waves-light"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setMin((page) * listnumber);
                                    setMax((page) * listnumber + 10);
                                    setPage(page+1)
                                  }}
                                    > {'>'} </button>) : <button
                                    className="btn btn-outline-primary waves-effect waves-light"
                                    > {'>'} </button>}
                    </div>
                    </div>
                    <p>
                    { page + ' of ' + pages.length}</p>
                  </div>
                  <select className='dropdown-menu' onChange={(e)=>{setListnumber(e.target.value); 
                                setMin(0);
                                setMax(e.target.value)
                                setPage(1) }}>
                    <option className='dropdown-item' value={10} >10</option>
                    <option className='dropdown-item' value={15}>15</option>
                    <option className='dropdown-item' value={20}>20</option>
                  </select>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default List;
