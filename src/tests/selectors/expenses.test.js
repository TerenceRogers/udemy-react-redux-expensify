import moment from 'moment';
import selectExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses';

const filterDefaults = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
};

test('should filter by text value', () => {
  const filters = {
    ...filterDefaults,
    text: 'e'
  };
  const result = selectExpenses(expenses, filters);
  const expected = [
    expenses[2],
    expenses[1],
  ];
  expect(result).toEqual(expected);
});

test('should filter by start date', () => {
  const filters = {
    ...filterDefaults,
    startDate: moment(0).add(2, 'days'),
  };
  const result = selectExpenses(expenses, filters);
  const expected = [
    expenses[2],
    expenses[1],
  ];
  expect(result).toEqual(expected);
});

test('should filter by end date', () => {
  const filters = {
    ...filterDefaults,
    endDate: moment(0).add(2, 'days'),
  };
  const result = selectExpenses(expenses, filters);
  const expected = [
    expenses[1],
    expenses[0],
  ];
  expect(result).toEqual(expected);
});

test('should sort by date', () => {
  const filters = {
    ...filterDefaults,
    sortBy: 'date'
  };
  const result = selectExpenses(expenses, filters);
  const expected = [
    expenses[2],
    expenses[1],
    expenses[0],
  ];
  expect(result).toEqual(expected);
});

test('should sort by amount', () => {
  const filters = {
    ...filterDefaults,
    sortBy: 'amount'
  };
  const result = selectExpenses(expenses, filters);
  const expected = [
    expenses[1],
    expenses[2],
    expenses[0],
  ];
  expect(result).toEqual(expected);
});