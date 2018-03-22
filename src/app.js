import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, NavLink, Link, Route, Switch } from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const ExpenseDashboardPage = () => (
  <div>
    This is from my <strong>dashboard</strong> component
  </div>
);

const AddExpensePage = () => (
  <div>
    This is from my <strong>add expense</strong> component
  </div>
);

const EditExpensePage = () => (
  <div>
    This is from my <strong>edit expense</strong> component
  </div>
);

const HelpPage = () => (
  <div>
    This is from my <strong>help</strong> component
  </div>
);

const NotFoundPage = () => (
  <div>
    This is from my <strong>not found</strong> component. <Link to="/">Go Home</Link>
  </div>
);

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <span>
      <NavLink to="/" exact={true} activeClassName="is-active">Dashboard</NavLink>&nbsp;&nbsp;
      <NavLink to="/create" activeClassName="is-active">Add Expense</NavLink>&nbsp;&nbsp;
      <NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink>&nbsp;&nbsp;
      <NavLink to="/help" activeClassName="is-active">Help</NavLink>
    </span>
  </header>
);

const routes = (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact={true} component={ExpenseDashboardPage} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));
