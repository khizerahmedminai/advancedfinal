import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default function Navbar(props) {
  return (
    <Nav className='nav-justified'>
      {props.tabs.map((item, i) => {
        return (
          <NavItem key={item}>
            <NavLink
              key={item}
              href='#'
              style={{
                color: 'black',
                borderBottomLeftRadius: '0',
                borderTopLeftRadius: '0',
              }}
              className={props.activeTab === (i + 1).toString() ? 'bg-white shadow-sm' : ''}
              onClick={(e) => {
                props.toggleTab((i + 1).toString());
                props?.setView('none')
                props?.setIsAps(false)
              }}
            >
              {item}
            </NavLink>
          </NavItem>
        );
      })}
    </Nav>
  );
}
