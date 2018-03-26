import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = (props) => (
  <header>
    <h1>Expensify</h1>
    <span>
      <NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink>&nbsp;&nbsp;
      <NavLink to="/create" activeClassName="is-active">Add Expense</NavLink>&nbsp;&nbsp;
    </span>
    <button onClick={props.startLogout}>Logout</button>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);