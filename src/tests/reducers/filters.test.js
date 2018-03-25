import moment from 'moment';
import filtersReducer from '../../reducers/filters';
import { start } from 'repl';

const stateDefaults = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month'),
}

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  const expected = stateDefaults;
  expect(state).toEqual(expected);
});

test('should set sortBy to amount', () => {
  const action = {
    type: 'SET_SORT_BY',
    sortBy: 'amount'
  };
  const state = filtersReducer(undefined, action);
  const expected = 'amount'
  expect(state.sortBy).toBe(expected);
});

test('should set sortBy to date', () => {
  const currentState = {
    ...stateDefaults,
    sortBy: 'amount',
  }
  const action = {
    type: 'SET_SORT_BY',
    sortBy: 'date',
  };
  const state = filtersReducer(currentState, action);
  const expected = 'date'
  expect(state.sortBy).toBe(expected);
});

test('should set text filter', () => {
  const text = 'test value';
  const action = {
    type: 'SET_TEXT_FILTER',
    text,
  };
  const state = filtersReducer(undefined, action);
  const expected = text;
  expect(state.text).toBe(expected);
});

test('should set start date filter', () => {
  const startDate = moment();
  const action = {
    type: 'SET_START_DATE',
    startDate,
  };
  const state = filtersReducer(undefined, action);
  const expected = startDate;
  expect(state.startDate).toBe(expected);
});

test('should set end date filter', () => {
  const endDate = moment();
  const action = {
    type: 'SET_END_DATE',
    endDate,
  };
  const state = filtersReducer(undefined, action);
  const expected = endDate;
  expect(state.endDate).toBe(expected);
});