import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';

import ContactsIcon from '@material-ui/icons/Contacts';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const NavBar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <>
      <li>
        <a onClick={onLogout} href="#!">
          <ExitToAppIcon /> <span className="hide-sm">Logout</span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <ContactsIcon fontSize="large" /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

NavBar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'far fa-address-book',
};

export default NavBar;
