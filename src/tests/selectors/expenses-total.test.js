import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 for no expenses', () => {
  const total = getExpensesTotal([]);
  expect(total).toBe(0);
});

test('should correctly add up a single expense', () => {
  const expense = expenses[0];
  const expected = expense.amount;
  const total = getExpensesTotal([expense]);
  expect(total).toBe(expected);
});

test('should correctly add up multiple expenses', () => {
  let expected = 0;
  expenses.forEach(expense => {
    expected += expense.amount;
  });
  const total = getExpensesTotal(expenses);
  expect(total).toBe(expected);
});