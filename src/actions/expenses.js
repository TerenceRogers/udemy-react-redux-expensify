import uuid from 'uuid';
import { dbRefExpenses } from '../firebase/firebase';

const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0,
    } = expenseData;
    const expense = {
      description,
      note,
      amount,
      createdAt,
    };
    return dbRefExpenses.push(expense)
      .then((ref) => {
        dispatch(addExpense({
          id: ref.key,
          ...expense,
        }));
      })
      .catch((error) => {
        console.error('Error pushing expense to firebase: \r\n', error);
      });
  };
};

const removeExpense = (id) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

export {
  addExpense,
  editExpense,
  removeExpense,
  startAddExpense,
};