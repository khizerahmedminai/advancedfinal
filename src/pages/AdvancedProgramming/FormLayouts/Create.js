import React, { useState, useEffect } from 'react';

import UiContent from '../../../Components/Common/UiContent';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GetEntryData from '../Contexts/InsertionContexts/GetEntryData';
import InputType from '../Contexts/InsertionContexts/inputType';
import inputSize from '../Contexts/InsertionContexts/inputSize';
//import Components
import SpecialTable from './SpecialTable';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  Label,
  Row,
  Button,
} from 'reactstrap';
import Modals from '../Components/InsertionComponents/Modals';
import GenerateColumns from '../Components/InsertionComponents/GenerateColumns';
import InsertAuto from '../Contexts/InsertionContexts/InsertAuto';
import ReqColumNames from '../Contexts/ReqColumNames';
import FieldTemp from '../Components/InsertionComponents/FieldTemp';
function Create() {
      // Table name from link
      const { _id } = useParams();
      const table = _id;
      // id of entry to be edited
      const { _num } = useParams();
      const num = _num;
  const [columnList, setColumnList] = useState([]);
  const list = [];
  const [test, setTest] = useState([]);
      // Excel tables objects
      const [gridItems, setGridItems] = useState([]);
      // Display the table for unique columns
      const [view, setView] = useState('none');
      // Sets the id of the id column to be inserted into by list
      const [idCol, setidCol] = useState('');
      // Object containing name of corresponding id
      const [accounts, setAccounts] = useState({});
      // sets the table name of the id column to be inserted into by list
      const [idTable, setidTable] = useState('Account');
      // All values inserted
      const [values, setValues] = useState({});
      let dat = {};
      // id of the new entry after submission
      const [newid, setNewid] = useState('');
  
      // Object containing all columns of the table
      const [info, setInfo] = useState([]);
    
      //Set active tab
      const [activeTab, setActiveTab] = useState('1');
      const toggleTab = (tab) => {
        if (activeTab !== tab) {
          setActiveTab(tab);
        }
      };
      //Set active Sub-Tab
      const [activeButton, setActiveButton] = useState('1');
      const toggleButton = (tab) => {
        if (activeButton !== tab) {
          setActiveButton(tab);
        }
      };
      const [isGrid, setIsGrid] = useState(false);
      // Modal messages
      //Success
      const [modal_successMessage, setmodal_successMessage] = useState(false);
      function tog_successMessage() {
        setmodal_successMessage(!modal_successMessage);
      }
      //Error1
      const [modal_errorMessage, setmodal_errorMessage] = useState(false);
      function tog_errorMessage() {
        setmodal_errorMessage(!modal_errorMessage);
      }
      //Error2
      const [modal_errorMessage2, setmodal_errorMessage2] = useState(false);
      function tog_errorMessage2() {
        setmodal_errorMessage2(!modal_errorMessage2);
      }


  useEffect(() => {
    ReqColumNames(table, setColumnList);
  }, [table]);

  function setData(name, e) {
    dat[name] = e;
  }


  function Field(props) {
    return (
      <FieldTemp
        colname={props.colname}
        isUnique={isUnique}
        inputSize={inputSize}
        findType={findType}
        accounts={accounts}
        setAccounts={setAccounts}
        setView={setView}
        setidTable={setidTable}
        setidCol={setidCol}
        setData={setData}
        values={values}
        setIsGrid={setIsGrid}
      />
    );
  }


  
    // Get values of the entry to be edited
    useEffect(() => {
      if (num && num !== 'id') {
      GetEntryData(table, num, setValues);
    }
    }, [table, num]);

    // Get all columns of the table
    useEffect(() => {
      axios
        .post('http://localhost:3001/info', {
          table: table,
        })
        .then((response) => {
          setInfo(response['recordset']);
        });
    }, [table]);
  
    // Function for setting the current table for unique column
    function setAcc(name, e) {
      setAccounts({ ...accounts, [name]: e });
    }
  
    // function to find the type of input
    function findType(name) {
      for (let i = 0; i < info.length; i++) {
        if (info[i].COLUMN_NAME === name) {
          return InputType(info[i].DATA_TYPE);
        }
      }
    }
    // function to find if the column is of Unique identifier type
    function isUnique(name) {
      for (let i = 0; i < info.length; i++) {
        if (info[i].COLUMN_NAME === name) {
          if (info[i].DATA_TYPE === 'uniqueidentifier') {
            return true;
          }
        }
      }
    }
  document.title = 'Create new  ' + table;
  return (
    <>
        
        <React.Fragment>
          
          <Modals
            modal_successMessage={modal_successMessage}
            tog_successMessage={tog_successMessage}
            modal_errorMessage={modal_errorMessage}
            tog_errorMessage={tog_errorMessage}
            tog_errorMessage2={tog_errorMessage2}
            modal_errorMessage2={modal_errorMessage2}
            table={table}
            num={num}
          />
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
              <BreadCrumb title={'Create new ' + table} pageTitle='Forms' />
              <Row>
                <Col xxl={12}>
                  <Card>
                    {/* <PreviewCardHeader title="Form Grid" /> */}
                    <CardBody>
                      <p className='text-muted'></p>
                      <Form onSubmit={(e)=>{
                        e.preventDefault();
                          InsertAuto(table, columnList, dat,tog_errorMessage, tog_successMessage, tog_errorMessage2)
                        }}>
                        <Row>
                          <GenerateColumns Field={Field} columnList={columnList} />
                        </Row>
                      <Button
                        color='primary'
                        type='submit' 
                      >
                        Submit
                      </Button>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </React.Fragment>
      
    </>
  );
}
export default Create;
