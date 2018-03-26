import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, removeExpense, editExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import { dbRefExpenses } from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('should generate remove expense action object', () => {
  const action = removeExpense('12345');
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '12345'
  });
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

test('should generate add expense action object with parameters', () => {
  const expense = expenses[0];
  const action = addExpense(expense);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expense,
  });
});

test('should add expense to database and store', async () => {
  const store = createMockStore({});
  const expense = expenses[0];
  delete expense.id; // ID is created by action function

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
  const snapshot = await dbRefExpenses.child(id).once('value');
  expect(snapshot.val()).toEqual(expense);
});

test('should add expense with defaults to database and store', async () => {
  const store = createMockStore({});
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
  const snapshot = await dbRefExpenses.child(id).once('value');
  expect(snapshot.val()).toEqual(expenseDefaults);
});