import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import getExpensesTotal from '../selectors/expenses-total';
import getVisibleExpenses from '../selectors/expenses';

export const ExpensesSummary = (props) => (
  <div>
    Viewing {props.expenseCount} expenses totaling&nbsp;
    {numeral(props.expensesTotal/100).format('$0,0.00')}
  </div>
);

const mapStateToProps = (state) => {
  const expenses = getVisibleExpenses(state.expenses, state.filters);
  return {
    expenseCount: expenses.length,
    expensesTotal: getExpensesTotal(expenses),
  };
};

export default connect(mapStateToProps)(ExpensesSummary);