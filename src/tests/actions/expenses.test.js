import { addExpense, removeExpense, editExpense } from '../../actions/expenses';

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
  const expenseData = {
    description: 'test expense',
    amount: 150900,
    createdAt: 1000,
    note: 'This is a test note'
  }
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String),
    }
  });
});

test('should generate add expense action object with defaults', () => {
  const action = addExpense();
  const defaultValues = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0,
    id: expect.any(String),
  };
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...defaultValues,
      id: expect.any(String),
    }
  });
});