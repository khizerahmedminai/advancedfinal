import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, DropdownMenu, DropdownToggle, Form, Table } from 'reactstrap';
import axios from 'axios';
//import images

//import Components
import SearchOption from '../Components/Common/SearchOption';
import LanguageDropdown from '../Components/Common/LanguageDropdown';
import WebAppsDropdown from '../Components/Common/WebAppsDropdown';
import MyCartDropdown from '../Components/Common/MyCartDropdown';
import FullScreenDropdown from '../Components/Common/FullScreenDropdown';
import NotificationDropdown from '../Components/Common/NotificationDropdown';
import ProfileDropdown from '../Components/Common/ProfileDropdown';
import LightDark from '../Components/Common/LightDark';

const Header = ({ onChangeLayoutMode, layoutModeType, headerClass }) => {
  const [timeTable, setTimeTable] = useState({});
  const [force, setForce] = useState(0);
  const [display, setDisplay] = useState(false);
  async function GenTimes(){
    const response = await axios.get('http://localhost:3001/generate-time-table');
    setDisplay(true);
    setTimeTable(response.timeTable.timetable);
    console.log(response.timeTable.timetable)
  }

  useEffect(() =>{
    console.log(timeTable)
  }, [timeTable])

  const TimeTable = () => {
    if (!timeTable) {
      console.log('NO')
      return <div>Loading time table...</div>;
    }
  
    return (
      
      <Table className="table table-striped table-bordered bg-white">
        <thead>
          <tr>
            <th>Day</th>
            <th>9:00</th>
            <th>10:00</th>
            <th>11:00</th>
            <th>12:00</th>
            <th>13:00</th>
            <th>14:00</th>
            <th>15:00</th>
            <th>16:00</th>
            <th>17:00</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(timeTable).map((day, hours) => (
            <tr key={hours}>
              <td>{hours}</td>
              {Object.values(day[1]).map((courses, index) => (
                <td key={index}>{courses.courseID}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };
  

  const [search, setSearch] = useState(false);
  const toogleSearch = () => {
    setSearch(!search);
  };

  const toogleMenuBtn = () => {
    var windowSize = document.documentElement.clientWidth;

    if (windowSize > 767) document.querySelector('.hamburger-icon').classList.toggle('open');

    //For collapse horizontal menu
    if (document.documentElement.getAttribute('data-layout') === 'horizontal') {
      document.body.classList.contains('menu')
        ? document.body.classList.remove('menu')
        : document.body.classList.add('menu');
    }

    //For collapse vertical menu
    if (document.documentElement.getAttribute('data-layout') === 'vertical') {
      if (windowSize < 1025 && windowSize > 767) {
        document.body.classList.remove('vertical-sidebar-enable');
        document.documentElement.getAttribute('data-sidebar-size') === 'sm'
          ? document.documentElement.setAttribute('data-sidebar-size', '')
          : document.documentElement.setAttribute('data-sidebar-size', 'sm');
      } else if (windowSize > 1025) {
        document.body.classList.remove('vertical-sidebar-enable');
        document.documentElement.getAttribute('data-sidebar-size') === 'lg'
          ? document.documentElement.setAttribute('data-sidebar-size', 'sm')
          : document.documentElement.setAttribute('data-sidebar-size', 'lg');
      } else if (windowSize <= 767) {
        document.body.classList.add('vertical-sidebar-enable');
        document.documentElement.setAttribute('data-sidebar-size', 'lg');
      }
    }

    //Two column menu
    if (document.documentElement.getAttribute('data-layout') === 'twocolumn') {
      document.body.classList.contains('twocolumn-panel')
        ? document.body.classList.remove('twocolumn-panel')
        : document.body.classList.add('twocolumn-panel');
    }
  };
  return (
    <React.Fragment>
      <header id='page-topbar' className={headerClass}>
        <div className='layout-width'>
          <div className='navbar-header'>
            <div className='d-flex'>
              <div className='navbar-brand-box horizontal-logo'>
                <Link to='/' className='logo logo-dark'>
                  <span className='logo-sm'>
                    {/* <img src={logoSm} alt='' height='22' /> */}
                  </span>
                  <span className='logo-lg'>
                    {/* <img src={logoDark} alt='' height='50' /> */}
                  </span>
                </Link>

                <Link to='/' className='logo logo-light'>
                  <span className='logo-sm'>
                    {/* <img src={logoSm} alt='' height='22' /> */}
                  </span>
                  <span className='logo-lg'>
                    {/* <img src={logoLight} alt='' height='50' /> */}
                  </span>
                </Link>
              </div>
              
              <button
                onClick={toogleMenuBtn}
                type='button'
                className='btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger'
                id='topnav-hamburger-icon'
              >
                <span className='hamburger-icon'>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>

              <SearchOption />
            </div>
            
            <div className='d-flex align-items-center'>
              <Dropdown
                isOpen={search}
                toggle={toogleSearch}
                className='d-md-none topbar-head-dropdown header-item'
              >
                <DropdownToggle
                  type='button'
                  tag='button'
                  className='btn btn-icon btn-topbar btn-ghost-secondary rounded-circle'
                >
                  <i className='bx bx-search fs-22'></i>
                </DropdownToggle>
                <DropdownMenu className='dropdown-menu-lg dropdown-menu-end p-0'>
                  <Form className='p-3'>
                    <div className='form-group m-0'>
                      <div className='input-group'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Search ...'
                          aria-label="Recipient's username"
                        />
                        <button className='btn btn-primary' type='submit'>
                          <i className='mdi mdi-magnify'></i>
                        </button>
                      </div>
                    </div>
                  </Form>
                </DropdownMenu>
              </Dropdown>
              <Button color='primary' className='btn btn-sm'
              onClick={(e) =>{
                e.preventDefault();
                GenTimes();
              }}
              >
              Generate Time Tables
            </Button>
              {/* LanguageDropdown */}
              {/* <LanguageDropdown /> */}

              {/* WebAppsDropdown */}
              {/* <WebAppsDropdown /> */}

              {/* MyCartDropdwon */}
              {/* <MyCartDropdown /> */}

              {/* FullScreenDropdown */}
              {/* <FullScreenDropdown /> */}

              {/* Dark/Light Mode set */}
              {/* <LightDark layoutMode={layoutModeType} onChangeLayoutMode={onChangeLayoutMode} /> */}

              {/* NotificationDropdown */}
              {/* <NotificationDropdown /> */}

              {/* ProfileDropdown */}
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>
      {display ? <>
        <div style={{ padding: '10rem', position: 'absolute', zIndex: 10, display: 'block', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <TimeTable />
        <button onClick={(e) => {
          e.preventDefault();
          setDisplay(false);
        }}>Close</button>
      </div>
      </>
       : null}
    </React.Fragment>
  );
};

export default Header;
