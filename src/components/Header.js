import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <span>
      <NavLink to="/" exact={true} activeClassName="is-active">Dashboard</NavLink>&nbsp;&nbsp;
      <NavLink to="/create" activeClassName="is-active">Add Expense</NavLink>&nbsp;&nbsp;
    </span>
  </header>
);

export default Header;