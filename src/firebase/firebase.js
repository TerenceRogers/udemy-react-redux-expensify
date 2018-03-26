import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
};
firebase.initializeApp(config);

const database = firebase.database();
const dbRefUsers = database.ref('users');
const dbChildExpenses = '/expenses'

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  database as default,
  firebase,
  googleAuthProvider,
  dbChildExpenses,
  dbRefUsers,
};

// const expenses = []
// expensesRef.on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
//   const id = snapshot.key;
//   const expenseIndex = expenses.findIndex(e => e.id === id);
//   expenses.splice(expenseIndex, 1);
//   console.log(expenses);
// });

// expensesRef.on('child_added', (snapshot) => {
//   const id = snapshot.key;
//   expenses.push({
//     id,
//     ...snapshot.val(),
//   });
//   console.log(expenses);
// });

// expensesRef.on('child_changed', (snapshot) => {
//   const id = snapshot.key;
//   const expenseIndex = expenses.findIndex(e => e.id === id);
//   expenses[expenseIndex] = {
//     id,
//     ...snapshot.val(),
//   };
//   console.log(expenses);
// });

// expensesRef.push({
//   description: 'Fine dinner',
//   amount: 12500,
//   createdAt: 12345678901,
//   note: '',
// });

// expensesRef.once('value')
//   .then((snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//       const id = childSnapshot.key;
//       expenses.push({
//         id,
//         ...snapshot.val(),
//       })
//     });
//     console.log(expenses);
//   })
//   .catch((error) => {
//     console.error('error retrieving data: ', error);
//   });

// expenses.forEach((expense) => {
//   delete expense.id;
//   expensesRef.push(expense)
//     .then((ref) => {
//       expense.id = ref.getKey();
//       console.log(expense);
//     })
//     .catch((error) => {
//       console.error('error pushing expense: ', error);
//     });
// });