import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

store.dispatch(addExpense({
  description: 'Gas Bill',
  amount: 2500,
  createdAt: 101,
  note: 'For April 2018 bill',
}));
store.dispatch(addExpense({
  description: 'Water Bill',
  amount: 5000,
  createdAt: 100,
  note: 'For March 2018 bill',
}));
store.dispatch(addExpense({
  description: 'Rent Bill',
  amount: 125000,
  createdAt: 102,
  note: 'For March 2018 bill',
}));
console.log(store.getState());

const state = store.getState();
console.log(state.filters);

console.log(getVisibleExpenses(state.expenses, state.filters));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
