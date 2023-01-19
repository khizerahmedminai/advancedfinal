import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';

//SimpleBar
import SimpleBar from 'simplebar-react';

//import images
import image2 from '../../assets/images/users/avatar-2.jpg';
import image3 from '../../assets/images/users/avatar-3.jpg';
import image5 from '../../assets/images/users/avatar-5.jpg';

const SearchOption = () => {
  const [value, setValue] = useState('');
  const [tables, setTables] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const onChangeData = (value) => {
    setValue(value);
  };

  useEffect(() => {
    var searchOptions = document.getElementById('search-close-options');
    var dropdown = document.getElementById('search-dropdown');
    var searchInput = document.getElementById('search-options');

    searchInput.addEventListener('focus', function () {
      var inputLength = searchInput.value.length;
      if (inputLength > 0) {
        dropdown.classList.add('show');
        searchOptions.classList.remove('d-none');
      } else {
        dropdown.classList.remove('show');
        searchOptions.classList.add('d-none');
      }
    });

    searchInput.addEventListener('keyup', function () {
      var inputLength = searchInput.value.length;
      if (inputLength > 0) {
        dropdown.classList.add('show');
        searchOptions.classList.remove('d-none');
      } else {
        dropdown.classList.remove('show');
        searchOptions.classList.add('d-none');
      }
    });

    searchOptions.addEventListener('click', function () {
      searchInput.value = '';
      dropdown.classList.remove('show');
      searchOptions.classList.add('d-none');
    });

    document.body.addEventListener('click', function (e) {
      if (e.target.getAttribute('id') !== 'search-options') {
        dropdown.classList.remove('show');
        searchOptions.classList.add('d-none');
      }
    });
  }, []);

  useEffect(() => {
    axios
      .post('http://localhost:3001/search/tables', {
        value: value,
      })
      .then((response) => {
        setTables(response);
      });
    axios
      .post('http://localhost:3001/search/entries', {
        value: value,
        table: 'students',
      })
      .then((response) => {
        setAccounts(response);
      });
  }, [value]);

  function Tables() {
    return tables.map((item, i) => {
      if (i < 5) {
        return (
          <>
            <Link to={'/list/' + item} className='dropdown-item notify-item'>
              <span>{item}</span>
            </Link>
          </>
        );
      }
    });
  }
  function Accounts() {
    return accounts.map((item, i) => {
      if (i < 5) {
        return (
          <>
            <Link
              to={'/update/students/' + item['id']}
              className='dropdown-item notify-item py-2'
            >
              <div className='d-flex'>
                <div className='flex-1'>
                  <h6 className='m-0'>{item['FirstName'] + ' ' + item['LastName']}</h6>
                  <span className='fs-11 mb-0 text-muted'>{item['enrollment_number']}</span>
                </div>
              </div>
            </Link>
          </>
        );
      }
    });
  }

  return (
    <React.Fragment>
      <form className='app-search d-none d-md-block'>
        <div className='position-relative'>
          <Input
            type='text'
            autoComplete='off'
            className='form-control'
            placeholder='Search...'
            id='search-options'
            value={value}
            onChange={(e) => {
              onChangeData(e.target.value);
            }}
          />
          <span className='mdi mdi-magnify search-widget-icon'></span>
          <span
            className='mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none'
            id='search-close-options'
          ></span>
        </div>
        <div className='dropdown-menu dropdown-menu-lg' id='search-dropdown'>
          <SimpleBar style={{ height: '320px' }}>
            {tables.length > 0 ? (
              <>
                <div className='dropdown-header mt-2'>
                  <h6 className='text-overflow text-muted mb-1 text-uppercase'>Tables</h6>
                </div>{' '}
                <Tables />
              </>
            ) : null}

            {accounts.length > 0 ? (
              <>
                <div className='dropdown-header mt-2'>
                  <h6 className='text-overflow text-muted mb-2 text-uppercase'>Students</h6>
                </div>

                <div className='notification-list'>
                  <Accounts />
                </div>
              </>
            ) : null}
          </SimpleBar>

          <div className='text-center pt-3 pb-1'>
            <Link to='/pages-search-results' className='btn btn-primary btn-sm'>
              View All Results <i className='ri-arrow-right-line ms-1'></i>
            </Link>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SearchOption;
