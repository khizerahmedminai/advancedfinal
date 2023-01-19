import React, { useState, useEffect } from 'react';

import UiContent from '../../../Components/Common/UiContent';
import axios from 'axios';
import { useParams } from 'react-router-dom';

//import Components
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

function Update() {
  const _id = useParams();
  const table = _id._id;
  const num = _id._num;

  const inputType = {
    date: 'date',
    int: 'number',
    varchar: 'text',
    text: 'textarea',
    bit: 'checkbox',
    float: 'number',
    nvarchar: 'text',
  };

  const [info, setInfo] = useState([]);
  const dat = {};
  const list = [];
  const [test, setTest] = useState([]);
  const [values, setValues] = useState([{}]);
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
  }, [table, num]);

  useEffect(() => {
    axios
      .post('http://localhost:3001/iteminfo', {
        table: table,
        num: num,
      })
      .then((response) => {
        setValues(response['recordset']);
      });
  }, [table, num]);

  useEffect(() => {
    try {
      axios
        .post('http://localhost:3001/list', {
          table: table,
        })
        .then((response) => {
          setTest(response['recordset']);
        });
    } catch (e) {
      console.log(e);
    }
  }, [table, num]);
  const addUser = () => {
    let y = 0;
    for (let i = 0; i < info.length; i++) {
      if (dat[info[i].COLUMN_NAME]) {
        list[y] = info[i].COLUMN_NAME;
        y++;
      }
    }
    axios
      .post('http://localhost:3001/update/', {
        dat: dat,
        table: table,
        columns: list,
        num: num,
      })
      .then((res) => {
        alert('Success');
      });
  };
  function setData(name, e) {
    dat[name] = e;
  }
  console.log('aaaaa')
  function Display() {
    return info.map((item, index) => {
      if (
        item['COLUMN_NAME'].includes('id') === false &&
        item['COLUMN_NAME'].includes('GUID') === false
      ) {
        if (item['DATA_TYPE'] === 'date' && values[0][item['COLUMN_NAME']]) {
          return (
            <>
              <Col md={4}>
                <div className='mb-3'>
                  <Label htmlFor='firstNameinput' className='form-label'>
                    {item['COLUMN_NAME']}
                  </Label>
                  <Input
                    defaultValue={values[0][item['COLUMN_NAME']].substring(0, 10)}
                    type={inputType[item['DATA_TYPE']]}
                    className='form-control'
                    name={item['COLUMN_NAME']}
                    onChange={(e) => {
                      setData(item['COLUMN_NAME'], e.target.value);
                    }}
                  />
                </div>
              </Col>
            </>
          );
        } else {
          return (
            <>
              <Col md={4}>
                <div className='mb-3'>
                  <Label htmlFor='firstNameinput' className='form-label'>
                    {item['COLUMN_NAME']}
                  </Label>
                  <Input
                    defaultValue={values[0][item['COLUMN_NAME']]}
                    type={inputType[item['DATA_TYPE']]}
                    className='form-control'
                    name={item['COLUMN_NAME']}
                    onChange={(e) => {
                      setData(item['COLUMN_NAME'], e.target.value);
                    }}
                  />
                </div>
              </Col>
            </>
          );
        }
      }
    });
  }

  document.title = 'Create new ' + table;
  return (<>
    
    <React.Fragment>
      <UiContent />
      <div className='page-content'>
        <Container fluid>
          <BreadCrumb title={'Update ' + table} pageTitle='Forms' />
          <Row>
            <Col xxl={12}>
              <Card>
                {/* <PreviewCardHeader title="Form Grid" /> */}
                <CardBody>
                  <p className='text-muted'></p>
                  <Form>
                    <Row>
                      <Display />
                    </Row>
                  </Form>
                  <Button color='primary' onClick={addUser}>
                    Submit
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  </>);
}

export default Update;
