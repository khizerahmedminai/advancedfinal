import React, { useState, useEffect } from 'react';

import UiContent from '../../../Components/Common/UiContent';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
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
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import classnames from 'classnames';

function SpecialTable(TAB) {
  const [activeTab, setActiveTab] = useState('1');
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const [activeTabb, setActiveTabb] = useState('1');
  const toggleTabb = (tab) => {
    if (activeTabb !== tab) {
      setActiveTabb(tab);
    }
  };
  const TABLE = TAB.TABLE;
  const table = TABLE['Name'];

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
  useEffect(() => {
    axios
      .post('http://localhost:3001/info', {
        table: table,
      })
      .then((response) => {
        setInfo(response['recordset']);
      });
  }, [table]);

  useEffect(() => {
    axios
      .post('http://localhost:3001/list', {
        table: table,
      })
      .then((response) => {
        setTest(response['recordset']);
      });
  }, [table]);
  const addUser = () => {
    let y = 0;
    for (let i = 0; i < info.length; i++) {
      if (dat[info[i].COLUMN_NAME]) {
        list[y] = info[i].COLUMN_NAME;
        y++;
      }
    }
    console.log(list);

    axios
      .post('http://localhost:3001/create/', {
        dat: dat,
        table: table,
        columns: list,
      })
      .then((res) => {
        console.log(res);
      });
  };
  function setData(name, e) {
    dat[name] = e;
  }

  const Field = (props) => {
    return (
      <Col md={4}>
        <div className='mb-3'>
          <Label htmlFor='firstNameinput' className='form-label'>
            {props.colname}
          </Label>
          <Input
            type={inputType[info[info.indexOf(['COLUMN_NAME'] === props.colname)]['DATA_TYPE']]}
            className='form-control'
            name={props.colname}
            onChange={(e) => {
              setData(props.colname, e.target.value);
            }}
          />
        </div>
      </Col>
    );
  };

  function Display() {
    return info.map((item, index) => {
      if (
        item['COLUMN_NAME'].includes('id') === false &&
        item['COLUMN_NAME'].includes('GUID') === false
      ) {
        return (
          <>
            <Col md={4}>
              <div className='mb-3'>
                <Label htmlFor='firstNameinput' className='form-label'>
                  {item['COLUMN_NAME']}
                </Label>
                <Input
                  type='text'
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
    });
  }

  return (
    <div className='page-content'>
      <Container fluid>
        <BreadCrumb title={'Create new ' + table} pageTitle='Forms' />
        <Nav>
          {TABLE['Nav_Titles'].map((item, index) => {
            return (
              <>
                <NavItem>
                  <Button
                    className={
                      activeTab === (index + 1).toString() ? 'active nav-link' : '' + ' nav-link'
                    }
                    onClick={() => {
                      toggleTab((index + 1).toString());
                    }}
                  >
                    {item}
                  </Button>
                </NavItem>
              </>
            );
          })}
        </Nav>
        <Row>
          <Col xxl={12}>
            <Card>
              <PreviewCardHeader title={table} />
              <CardBody>
                <p className='text-muted'></p>
                <Form>
                  <Row>
                    {TABLE['Nav_Titles'].map((item, index) => {
                      return TABLE['Sub_Tabs'].includes(index + 1) ? (
                        <>
                          <div
                            style={
                              activeTab === (index + 1).toString()
                                ? { display: 'block' }
                                : { display: 'none' }
                            }
                          >
                            {TABLE['Tab_Fields'][index].map((tem, i) => {
                              <button
                                onClick={(e) => {
                                  toggleTabb((i + 1).toString());
                                }}
                              >
                                {tem}
                              </button>;
                            }) +
                              TABLE['Tab_Fields'][index].map((tem, i) => {
                                <div
                                  style={
                                    activeTabb === i + 1
                                      ? { display: 'block' }
                                      : { display: 'none' }
                                  }
                                >
                                  {TABLE['Sub_Tab_Fields'][0][i].map((t, j) => {
                                    <Field colname={t} />;
                                  })}
                                </div>;
                              })}
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            style={
                              activeTab === (index + 1).toString()
                                ? { display: 'block' }
                                : { display: 'none' }
                            }
                          >
                            {TABLE['Tab_Fields'][index].map((tem, i) => {
                              <Field colname={tem} />;
                            })}
                          </div>
                        </>
                      );
                    })}
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
  );
}

export default SpecialTable;
