import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

const stateDefaults = [];

test('should set default state', () => {
  const action = { type: '@@INIT' };
  const state = expensesReducer(undefined, action);
  const expected = stateDefaults;
  expect(state).toEqual(expected);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id,
  };
  const state = expensesReducer(expenses, action);
  const expected = [
    expenses[0],
    expenses[2],
  ];
  expect(state).toEqual(expected);
});

test('should not remove any expenses for invalid id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: 'invalidId',
  };
  const state = expensesReducer(expenses, action);
  const expected = expenses;
  expect(state).toEqual(expected);
});

test('should add expense', () => {
  const expense = {
    id: '999',
    description: 'new expense',
    note: '',
    amount: 99000,
    createdAt: 199000,
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense,
  };
  const state = expensesReducer(expenses, action);
  const expected = [
    ...expenses,
    expense,
  ];
  expect(state).toEqual(expected);
});

test('should edit expense', () => {
  const updates = {
    description: 'modified description',
    amount: 99999,
  };
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[2].id,
    updates,
  };
  const state = expensesReducer(expenses, action);
  const expected = [
    expenses[0],
    expenses[1],
    {
      ...expenses[2],
      ...updates,
    }
  ];
  expect(state).toEqual(expected);
});

test('should not edit expense if expense not found', () => {
  const updates = {
    description: 'modified description',
    amount: 99999,
  };
  const action = {
    type: 'EDIT_EXPENSE',
    id: 'invalidId',
    updates,
  };
  const state = expensesReducer(expenses, action);
  const expected = expenses;
  expect(state).toEqual(expected);
});
