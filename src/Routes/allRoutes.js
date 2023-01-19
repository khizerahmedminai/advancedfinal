import React from 'react';
import { Redirect } from 'react-router-dom';

//login
import Login from '../pages/Authentication/Login';
import ForgetPasswordPage from '../pages/Authentication/ForgetPassword';
import Logout from '../pages/Authentication/Logout';
import Register from '../pages/Authentication/Register';
// User Profile
import UserProfile from '../pages/Authentication/user-profile';


// AdvancedProgramming
import Create from '../pages/AdvancedProgramming/FormLayouts/Create';
import Update from '../pages/AdvancedProgramming/FormLayouts/Update';
import List from '../pages/AdvancedProgramming/Tables/List';

const authProtectedRoutes = [

  // AdvancedProgramming
  { path: '/create/:_id', component: Create },
  { path: '/Add/:_id/:_num', component: Create },
  { path: '/list/:_id', component: List },
  { path: '/update/:_id/:_num', component: Update },
  //User Profile
  { path: '/profile', component: UserProfile },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: '/',
    exact: true,
    component: () => <Redirect to='/dashboard' />,
  },
];

const publicRoutes = [
  // Authentication Page
  { path: '/logout', component: Logout },
  { path: '/login', component: Login },
  { path: '/forgot-password', component: ForgetPasswordPage },
  { path: '/register', component: Register },
];

export { authProtectedRoutes, publicRoutes };
