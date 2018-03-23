import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

const EditExpensePage = (props) => {
  return (
    <div>
      <ExpenseForm
        expense={props.expense}
        onSubmit={(expense) => {
          const expenseId = props.match.params.id;
          props.dispatch(editExpense(expenseId, expense));
          props.history.push('/');
        }}
      />
      <button onClick={() => {
        const expenseId = props.match.params.id;
        props.dispatch(removeExpense(expenseId));
        props.history.push('/');
      }}>Remove</button>
    </div>
  )
};

const mapStateToProps = (state, props) => {
  const expenseId = props.match.params.id;
  return {
    expense: state.expenses.find(e => e.id === expenseId),
  };
};

export default connect(mapStateToProps)(EditExpensePage);