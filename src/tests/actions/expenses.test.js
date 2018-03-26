import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addExpense,
  startAddExpense,
  removeExpense,
  startRemoveExpense,
  editExpense,
  startEditExpense,
  setExpenses,
  startSetExpenses, } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import { dbRefUsers, dbChildExpenses } from '../../firebase/firebase';

const uid = 'abc123456789';
const createMockStore = configureMockStore([thunk]);
const defaultState = {
  auth: {
    uid
  }
};
const dbRefUserExpenses = dbRefUsers.child(`${uid}${dbChildExpenses}`);

beforeEach(async () => {
  const expensesData = {};
  expenses.forEach((expense) => {
    const { id, ...expenseData } = expense;
    expensesData[id] = expenseData;
  });
  await dbRefUserExpenses.set(expensesData);
});

test('should generate remove expense action object', () => {
  const action = removeExpense('12345');
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '12345'
  });
});

test('should remove expense from firebase', async () => {
  const expense = expenses[0];
  const id = expense.id;
  let snapshot = await dbRefUserExpenses.child(id).once('value');
  expect(snapshot.val()).toBeTruthy();

  const store = createMockStore(defaultState);
  await store.dispatch(startRemoveExpense(id));
  const action = store.getActions()[0];
  const expectedAction = {
    type: 'REMOVE_EXPENSE',
    id,
  };
  expect(action).toEqual(expectedAction);

  snapshot = await dbRefUserExpenses.child(id).once('value');
  expect(snapshot.val()).toBeFalsy();
});

test('should generate edit expense action object', () => {
  const action = editExpense(
    '12345',
    { description: 'new description',
      amount: 500,
      note: 'new note'
    }
  );
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '12345',
    updates: {
      description: 'new description',
      amount: 500,
      note: 'new note'
    }
  });
});

test('should edit expense on firebase', async () => {
  const expense = expenses[0];
  const { id, ...expenseData } = expense;
  const updates = {
    description: 'modified description',
    note: 'modified note'
  };
  const updatedExpenseData = {
    ...expenseData,
    ...updates,
  };

  const store = createMockStore(defaultState);
  await store.dispatch(startEditExpense(id, updates));
  const action = store.getActions()[0];
  const expectedAction = {
    type: 'EDIT_EXPENSE',
    id,
    updates,
  };
  expect(action).toEqual(expectedAction);

  const snapshot = await dbRefUserExpenses.child(id).once('value');
  expect(snapshot.val()).toEqual(updatedExpenseData);
});

test('should generate add expense action object with parameters', () => {
  const expense = expenses[0];
  const action = addExpense(expense);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expense,
  });
});

test('should add expense to database and store', async () => {
  const store = createMockStore(defaultState);
  const expense = {
    description: 'Test expense',
    amount: 9995,
    createdAt: 9009009009,
    note: 'This is a test note',
  };

  await store.dispatch(startAddExpense(expense));

  const expectedAction = {
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expense,
    }
  };
  const dispatchedAction = store.getActions()[0];
  expect(dispatchedAction).toEqual(expectedAction);

  const id = dispatchedAction.expense.id;
  const snapshot = await dbRefUserExpenses.child(id).once('value');
  expect(snapshot.val()).toEqual(expense);
});

test('should add expense with defaults to database and store', async () => {
  const store = createMockStore(defaultState);
  const expenseDefaults = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0,
  };

  await store.dispatch(startAddExpense());

  const expectedAction = {
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseDefaults,
    }
  };
  const dispatchedAction = store.getActions()[0];
  expect(dispatchedAction).toEqual(expectedAction);

  const id = dispatchedAction.expense.id;
  const snapshot = await dbRefUserExpenses.child(id).once('value');
  expect(snapshot.val()).toEqual(expenseDefaults);
});

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  const expected = {
    type: 'SET_EXPENSES',
    expenses
  };
  expect(action).toEqual(expected);
});

test('should fetch the expenses from firebase', async () => {
  const store = createMockStore(defaultState);
  await store.dispatch(startSetExpenses());
  const action = store.getActions()[0];
  const expected = {
    type: 'SET_EXPENSES',
    expenses,
  };
  expect(action).toEqual(expected);
});
