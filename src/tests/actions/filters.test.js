import moment from 'moment';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../../actions/filters';

test('should generate set start date action object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0),
  });
});

test('should generate set end date action object', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0),
  });
});

test('should generate sort by date action object', () => {
  const action = sortByDate();
  const expected = {
    type: 'SET_SORT_BY',
    sortBy: 'date',
  };
  expect(action).toEqual(expected);
});

test('should generate sort by amount action object', () => {
  const action = sortByAmount();
  const expected = {
    type: 'SET_SORT_BY',
    sortBy: 'amount',
  };
  expect(action).toEqual(expected);
});

test('should generate set text filter action object with parameter', () => {
  const action = setTextFilter('test string');
  const expected = {
    type: 'SET_TEXT_FILTER',
    text: 'test string',
  };
  expect(action).toEqual(expected);
});

test('should generate set text filter action object with defaults', () => {
  const action = setTextFilter();
  const expected = {
    type: 'SET_TEXT_FILTER',
    text: '',
  };
  expect(action).toEqual(expected);
});