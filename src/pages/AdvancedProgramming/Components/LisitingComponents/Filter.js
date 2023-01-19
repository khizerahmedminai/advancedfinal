import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import GenerateColumns from '../InsertionComponents/GenerateColumns'
import FieldTemp from '../InsertionComponents/FieldTemp'
import inputSize from '../../Contexts/InsertionContexts/inputSize';
import InputType from '../../Contexts/InsertionContexts/inputType';
export default function Filter(props) {
  const display = props.filterView;
    function findType(name) {
        for (let i = 0; i < props.columnList.length; i++) {
          if (props.columnList[i].COLUMN_NAME === name) {
            return InputType(props.columnList[i].DATA_TYPE);
          }
        }
      }
    function isUnique(name) {
        for (let i = 0; i < props.columnList.length; i++) {
          if (props.columnList[i].COLUMN_NAME === name) {
            if (props.columnList[i].DATA_TYPE === 'uniqueidentifier') {
              return true;
            }
          }
        }
      }
    const [accounts, setAccounts] = useState({});
    const [idTable, setidTable] = useState('Account');
    const [idCol, setidCol] = useState('');
    const [isGrid, setIsGrid] = useState(false);
    // const [values, setValues] = useState({});
    function setData(name, e) {
        props.setFilterObj({ ...props.filterObj, [name]: e });
      }
      function setAcc(name, e) {
        setAccounts({ ...accounts, [name]: e });
      }
      const setView = props.setView;
      const values = props.filterObj;
    function Field(props) {
        return (
          <FieldTemp
            size={12}
            colname={props.colname}
            isUnique={isUnique}
            inputSize={inputSize}
            findType={findType}
            accounts={accounts}
            setView={setView}
            setidTable={setidTable}
            setidCol={setidCol}
            setData={setData}
            values={values}
            setIsGrid={setIsGrid}
          />
        );
    }
  return (
    <>

            <Col xl={props.filterView === 'flex' ? 2 : 0}>

    <div style={{backgroundColor: 'white', display: display, zIndex: 3, boxShadow: ' 0 0 50px #0000001c', padding: '1rem', borderRadius: '1rem', width: '100%', height: '45rem', overflowY: 'scroll', overflowX: 'hidden'}}>
        <Row>
        <h3>Filter</h3>
        <GenerateColumns Field={Field} columnList={props.columnList} />
        </Row>
    </div>    
    <div style={{display: display, justifyContent: 'space-evenly', padding: '1rem'}}>
    <Button className='btn btn-danger m-2' onClick={(e)=> {e.preventDefault(); props.setFilterObj({});}}>Reset</Button>
    <Button className='btn btn-success m-2' onClick={(e)=>{props.setFilterView('none')}}>Hide</Button>
    </div>
    </Col>
    </>
  )
}
