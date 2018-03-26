import uuid from 'uuid';
import { dbRefUsers, dbChildExpenses } from '../firebase/firebase';

const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
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
    const uid = getState().auth.uid;
    return dbRefUsers.child(`${uid}${dbChildExpenses}`).push(expense)
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
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return dbRefUsers.child(`${uid}${dbChildExpenses}`).child(id).remove()
      .then(() => {
        dispatch(removeExpense(id));
      })
      .catch((error) => {
        console.error('Error removing expense from Firebase: ', error);
      });
  };
};

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return dbRefUsers.child(`${uid}${dbChildExpenses}`).child(id).update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      })
      .catch((error) => {
        console.error('Error updating expense on Firebase: ', error);
      });
  };
};

const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses,
});

const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return dbRefUsers.child(`${uid}${dbChildExpenses}`).once('value')
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
  startEditExpense,
  startRemoveExpense,
  startSetExpenses,
};