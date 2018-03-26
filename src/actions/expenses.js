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

const startRemoveExpense = (id) => {
  return (dispatch) => {
    return dbRefExpenses.child(id).remove()
      .then(() => {
        dispatch(removeExpense(id));
      })
      .catch((error) => {
        console.error('Error removing expense from Firebase: ', error);
      })
  }
}

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses,
});

const startSetExpenses = () => {
  return (dispatch) => {
    return dbRefExpenses.once('value')
      .then((snapshot) => {
        const expenses = [];
        snapshot.forEach((childSnapshot) => {
          const id = childSnapshot.key;
          expenses.push({
            id,
            ...childSnapshot.val(),
          });
        });
        dispatch(setExpenses(expenses));
      })
      .catch((error) => {
        console.error('Error fetching expenses from Firebase: ', error);
      })
  }
};

export {
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startAddExpense,
  startRemoveExpense,
  startSetExpenses,
};