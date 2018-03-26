import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends Component {
  onSubmit = (expense) => {
    const id = this.props.expense.id;
    this.props.editExpense(id, expense);
    this.props.history.push('/');
  };
  onRemove = () => {
    const id = this.props.expense.id;
    this.props.startRemoveExpense(id);
    this.props.history.push('/');
  };
  render() {
    return (
    <div>
      <ExpenseForm
        expense={this.props.expense}
        onSubmit={this.onSubmit}
      />
      <button onClick={this.onRemove}>Remove</button>
    </div>
    );
  };
}

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find(
      e => e.id === props.match.params.id
    ),
});

const mapDispatchToProps = (dispatch) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  startRemoveExpense: (id) => dispatch(startRemoveExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);