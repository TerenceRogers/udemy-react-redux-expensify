import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import getExpensesTotal from '../selectors/expenses-total';
import getVisibleExpenses from '../selectors/expenses';

export const ExpensesSummary = (props) => {
  const expenseWord = props.expenseCount === 1 ? 'expense' : 'expenses';
  const formattedExpenseTotal = numeral(props.expensesTotal/100).format('$0,0.00');
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{props.expenseCount}</span> {expenseWord}
          &nbsp;totaling <span>{formattedExpenseTotal}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const expenses = getVisibleExpenses(state.expenses, state.filters);
  return {
    expenseCount: expenses.length,
    expensesTotal: getExpensesTotal(expenses),
  };
};

export default connect(mapStateToProps)(ExpensesSummary);