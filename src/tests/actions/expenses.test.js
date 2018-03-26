import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, removeExpense, startRemoveExpense, editExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import { dbRefExpenses } from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach(async () => {
  const expensesData = {};
  expenses.forEach((expense) => {
    const { id, ...expenseData } = expense;
    expensesData[id] = expenseData;
  });
  await dbRefExpenses.set(expensesData);
});


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

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  const expected = {
    type: 'SET_EXPENSES',
    expenses
  };
  expect(action).toEqual(expected);
});

test('should fetch the expenses from firebase', async () => {
  const store = createMockStore({});
  await store.dispatch(startSetExpenses());
  const action = store.getActions()[0];
  const expected = {
    type: 'SET_EXPENSES',
    expenses,
  };
  expect(action).toEqual(expected);
});

test('should remove expense from firebase', async () => {
  const expense = expenses[0];
  const id = expense.id;
  let snapshot = await dbRefExpenses.child(id).once('value');
  expect(snapshot.val()).toBeTruthy();
  const store = createMockStore({});
  await store.dispatch(startRemoveExpense(id));
  snapshot = await dbRefExpenses.child(id).once('value');
  expect(snapshot.val()).toBeNull();
})