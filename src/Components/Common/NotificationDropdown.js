import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

//import images
import avatar2 from '../../assets/images/users/avatar-2.jpg';
import avatar8 from '../../assets/images/users/avatar-8.jpg';
import avatar3 from '../../assets/images/users/avatar-3.jpg';
import avatar6 from '../../assets/images/users/avatar-6.jpg';
import bell from '../../assets/images/svg/bell.svg';

//SimpleBar
import SimpleBar from 'simplebar-react';

const NotificationDropdown = () => {
  function remaining(input) {
    var date = new Date(input);
    var milliseconds = date.getTime();
    return parseInt((milliseconds - Date.now()) / (1000 * 60 * 60 * 24));
  }

  function timeAgo(input) {
    const date = input instanceof Date ? input : new Date(input);
    const formatter = new Intl.RelativeTimeFormat('en');
    const ranges = {
      years: 3600 * 24 * 365,
      months: 3600 * 24 * 30,
      weeks: 3600 * 24 * 7,
      days: 3600 * 24,
      hours: 3600,
      minutes: 60,
      seconds: 1,
    };
    const secondsElapsed = (date.getTime() - Date.now()) / 1000;
    for (let key in ranges) {
      if (ranges[key] < Math.abs(secondsElapsed)) {
        const delta = secondsElapsed / ranges[key];
        return formatter.format(Math.round(delta), key);
      }
    }
  }

  let number = [];
  const [alerts, setAlerts] = useState([]);
  const [refresher, setRefresher] = useState(0);
  useEffect(() => {
    axios
      .post('http://localhost:3001/alerts/get', {
        table: 'alerts',
      })
      .then((response) => {
        setAlerts(response['recordset']);
      });
  }, [refresher]);

  function Delete(number) {
    axios
      .post('http://localhost:3001/delete', {
        table: 'alerts',
        number: number,
      })
      .then((res) => {
        console.log(res);
      });
    setRefresher(refresher + 1);
    number = null;
  }

  function AddNumber(num, chk) {
    if (chk) {
      number.push(num);
    } else {
      let index = number.indexOf(num);
      number.splice(index, 1);
    }
  }

  function Notifications() {
    return alerts.map((item) => {
      return (
        <>
          <div className='text-reset notification-item d-block dropdown-item position-relative'>
            <div className='d-flex'>
              <div className='avatar-xs me-3'>
                {remaining(item['Expdate']) < 5 ? (
                  <span className='avatar-title bg-soft-danger text-info rounded-circle fs-16'>
                    <i style={{ color: 'black' }} className=' bx bx-error-circle '></i>
                  </span>
                ) : (
                  <span className='avatar-title bg-soft-info text-info rounded-circle fs-16'>
                    <i style={{ color: 'black' }} className=' bx bx-error-circle '></i>
                  </span>
                )}
              </div>
              <div className='flex-1'>
                <Link
                  to={'/view/' + item['Table_name'] + '/' + item['Entry_number']}
                  className='stretched-link'
                >
                  <h6 className='mt-0 mb-2 lh-base'>{item['Details']}</h6>
                </Link>
                <p className='mb-0 fs-11 fw-medium text-uppercase text-muted'>
                  {timeAgo(item['Date'])}
                </p>
              </div>
              <div className='px-2 fs-15'>
                <div className='form-check notification-check'>
                  <Button
                    className='form-check-input btn-icon'
                    color='danger'
                    value=''
                    id={item['Number']}
                    onClick={(e) => {
                      Delete(e.target.id);
                    }}
                  >
                    <i className='ri-delete-bin-5-line' />
                  </Button>
                  <label
                    className='form-check-label'
                    htmlFor='messages-notification-check01'
                  ></label>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });
  }

  //Dropdown Toggle
  const [isNotificationDropdown, setIsNotificationDropdown] = useState(false);
  const toggleNotificationDropdown = () => {
    setIsNotificationDropdown(!isNotificationDropdown);
  };

  //Tab
  const [activeTab, setActiveTab] = useState('1');
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isNotificationDropdown}
        toggle={toggleNotificationDropdown}
        className='topbar-head-dropdown ms-1 header-item'
      >
        <DropdownToggle
          type='button'
          tag='button'
          className='btn btn-icon btn-topbar btn-ghost-secondary rounded-circle'
        >
          <i className='bx bx-bell fs-22'></i>
          {alerts.length > 0 && (
            <span className='position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger'>
              {alerts.length}
              <span className='visually-hidden'>unread messages</span>
            </span>
          )}
        </DropdownToggle>
        <DropdownMenu className='dropdown-menu-lg dropdown-menu-end p-0'>
          <div className='dropdown-head bg-primary bg-pattern rounded-top'>
            <div className='p-3'>
              <Row className='align-items-center'>
                <Col>
                  <h6 className='m-0 fs-16 fw-semibold text-white'> Notifications </h6>
                </Col>
                <div className='col-auto dropdown-tabs'>
                  <span className='badge badge-soft-light fs-13'>{alerts.length}</span>
                </div>
              </Row>
            </div>

            <div className='px-2 pt-2'>
              <Nav className='nav-tabs dropdown-tabs nav-tabs-custom'>
                <NavItem>
                  <NavLink
                    href='#'
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => {
                      toggleTab('1');
                    }}
                  >
                    All ({alerts.length})
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href='#'
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => {
                      toggleTab('2');
                    }}
                  >
                    Messages
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href='#'
                    className={classnames({ active: activeTab === '3' })}
                    onClick={() => {
                      toggleTab('3');
                    }}
                  >
                    Alerts
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>

          <TabContent activeTab={activeTab}>
            <TabPane tabId='1' className='py-2 ps-2'>
              <SimpleBar style={{ maxHeight: '300px' }} className='pe-2'>
                {/* <div className="text-reset notification-item d-block dropdown-item position-relative">
                                    <div className="d-flex">
                                        <div className="avatar-xs me-3">
                                            <span className="avatar-title bg-soft-info text-info rounded-circle fs-16">
                                                <i className=" bx bx-error-circle"></i>
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <Link to="#" className="stretched-link">
                                                <h6 className="mt-0 mb-2 lh-base">Your <b>Elite</b> author Graphic
                                                    Optimization <span className="text-secondary">reward</span> is ready!
                                                </h6>
                                            </Link>
                                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                <span><i className="mdi mdi-clock-outline"></i> Just 30 sec ago</span>
                                            </p>
                                        </div>
                                        <div className="px-2 fs-15">
                                            <div className="form-check notification-check">
                                                <input className="form-check-input" type="checkbox" value="" id="messages-notification-check01" />
                                                <label className="form-check-label" htmlFor="messages-notification-check01"></label>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                {alerts.length === 0 && (
                  <>
                    <div className='w-25 w-sm-50 pt-3 mx-auto'>
                      <img src={bell} className='img-fluid' alt='user-pic' />
                    </div>
                    <div className='text-center pb-5 mt-2'>
                      <h6 className='fs-18 fw-semibold lh-base'>
                        Hey! You have no any notifications{' '}
                      </h6>
                    </div>
                  </>
                )}
                {alerts.length > 0 && (
                  <>
                    <Notifications />

                    <div className='my-3 text-center'>
                      <button
                        type='button'
                        className='btn btn-soft-success waves-effect waves-light'
                      >
                        View All Notifications <i className='ri-arrow-right-line align-middle'></i>
                      </button>
                    </div>
                  </>
                )}
              </SimpleBar>
            </TabPane>

            <TabPane tabId='2' className='py-2 ps-2'>
              <SimpleBar style={{ maxHeight: '300px' }} className='pe-2'>
                <div className='text-reset notification-item d-block dropdown-item'>
                  <div className='d-flex'>
                    <img src={avatar3} className='me-3 rounded-circle avatar-xs' alt='user-pic' />
                    <div className='flex-1'>
                      <Link to='#' className='stretched-link'>
                        <h6 className='mt-0 mb-1 fs-13 fw-semibold'>James Lemire</h6>
                      </Link>
                      <div className='fs-13 text-muted'>
                        <p className='mb-1'>We talked about a project on linkedin.</p>
                      </div>
                      <p className='mb-0 fs-11 fw-medium text-uppercase text-muted'>
                        <span>
                          <i className='mdi mdi-clock-outline'></i> 30 min ago
                        </span>
                      </p>
                    </div>
                    <div className='px-2 fs-15'>
                      <div className='form-check notification-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value=''
                          id='messages-notification-check01'
                        />
                        <label
                          className='form-check-label'
                          htmlFor='messages-notification-check01'
                        ></label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='text-reset notification-item d-block dropdown-item'>
                  <div className='d-flex'>
                    <img src={avatar2} className='me-3 rounded-circle avatar-xs' alt='user-pic' />
                    <div className='flex-1'>
                      <Link to='#' className='stretched-link'>
                        <h6 className='mt-0 mb-1 fs-13 fw-semibold'>Angela Bernier</h6>
                      </Link>
                      <div className='fs-13 text-muted'>
                        <p className='mb-1'>
                          Answered to your comment on the cash flow forecast's graph 🔔.
                        </p>
                      </div>
                      <p className='mb-0 fs-11 fw-medium text-uppercase text-muted'>
                        <span>
                          <i className='mdi mdi-clock-outline'></i> 2 hrs ago
                        </span>
                      </p>
                    </div>
                    <div className='px-2 fs-15'>
                      <div className='form-check notification-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value=''
                          id='messages-notification-check02'
                        />
                        <label
                          className='form-check-label'
                          htmlFor='messages-notification-check02'
                        ></label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='text-reset notification-item d-block dropdown-item'>
                  <div className='d-flex'>
                    <img src={avatar6} className='me-3 rounded-circle avatar-xs' alt='user-pic' />
                    <div className='flex-1'>
                      <Link to='#' className='stretched-link'>
                        <h6 className='mt-0 mb-1 fs-13 fw-semibold'>Kenneth Brown</h6>
                      </Link>
                      <div className='fs-13 text-muted'>
                        <p className='mb-1'>Mentionned you in his comment on 📃 invoice #12501. </p>
                      </div>
                      <p className='mb-0 fs-11 fw-medium text-uppercase text-muted'>
                        <span>
                          <i className='mdi mdi-clock-outline'></i> 10 hrs ago
                        </span>
                      </p>
                    </div>
                    <div className='px-2 fs-15'>
                      <div className='form-check notification-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value=''
                          id='messages-notification-check03'
                        />
                        <label
                          className='form-check-label'
                          htmlFor='messages-notification-check03'
                        ></label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='text-reset notification-item d-block dropdown-item'>
                  <div className='d-flex'>
                    <img src={avatar8} className='me-3 rounded-circle avatar-xs' alt='user-pic' />
                    <div className='flex-1'>
                      <Link to='#' className='stretched-link'>
                        <h6 className='mt-0 mb-1 fs-13 fw-semibold'>Maureen Gibson</h6>
                      </Link>
                      <div className='fs-13 text-muted'>
                        <p className='mb-1'>We talked about a project on linkedin.</p>
                      </div>
                      <p className='mb-0 fs-11 fw-medium text-uppercase text-muted'>
                        <span>
                          <i className='mdi mdi-clock-outline'></i> 3 days ago
                        </span>
                      </p>
                    </div>
                    <div className='px-2 fs-15'>
                      <div className='form-check notification-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value=''
                          id='messages-notification-check04'
                        />
                        <label
                          className='form-check-label'
                          htmlFor='messages-notification-check04'
                        ></label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='my-3 text-center'>
                  <button type='button' className='btn btn-soft-success waves-effect waves-light'>
                    View All Messages <i className='ri-arrow-right-line align-middle'></i>
                  </button>
                </div>
              </SimpleBar>
            </TabPane>
            <TabPane tabId='3' className='p-4'>
              <div className='w-25 w-sm-50 pt-3 mx-auto'>
                <img src={bell} className='img-fluid' alt='user-pic' />
              </div>
              <div className='text-center pb-5 mt-2'>
                <h6 className='fs-18 fw-semibold lh-base'>Hey! You have no any notifications </h6>
              </div>
            </TabPane>
          </TabContent>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default NotificationDropdown;
