import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// Expense Action Generators
const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0 } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch(action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(expense => expense.id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id == action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense;
        }
      })
    default:
      return state;
  }
};

// Filters Action Generators
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

// Filters Reducer
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
}
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch(action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      };
    case 'SET_SORT_BY':
      return {
        ...state,
        sortBy: action.sortBy,
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state;
  }
}

// Filter/Sort Expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter(expense => {
    const startDateMatch = (
      typeof startDate != 'number' ||
      startDate <= expense.createdAt
    );
    const endDateMatch = (
      typeof endDate != 'number' ||
      expense.createdAt <= endDate
    );
    const textMatch = (
      typeof text !== 'string' ||
      (
        typeof expense.description === 'string' &&
        expense.description.toLowerCase().includes(text.toLowerCase())
      )
    );
    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt > b.createdAt ? -1 : 1;
    }
    if (sortBy === 'amount') {
      return a.amount > b.amount ? -1 : 1;
    }
  });
};

// Store Creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

store.subscribe(() => {
  const state = store.getState();
  console.log(state.filters);
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({
  description: 'rent',
  amount: 1100,
  createdAt: -2000,
}));
const expenseTwo = store.dispatch(addExpense({
  description: 'coffee',
  amount: 300,
  createdAt: -1000,
}));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

// store.dispatch(setTextFilter('e'));
// store.dispatch(setTextFilter(''));

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));
// store.dispatch(setEndDate());

const demoState = {
  expenses: [
    {
      id: 'placeholder',
      description: 'rent',
      note: 'stuff for the note',
      amount: 12345, // amount in cents
      createdAt: 0, // DateTime
    }
  ],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined,
  }
};