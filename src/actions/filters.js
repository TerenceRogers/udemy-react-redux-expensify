const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
});

const sortByAmount = () => ({
  type: 'SET_SORT_BY',
  sortBy: 'amount',
});

const sortByDate = () => ({
  type: 'SET_SORT_BY',
  sortBy: 'date',
});

const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate,
});

const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate,
});

export {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate
};