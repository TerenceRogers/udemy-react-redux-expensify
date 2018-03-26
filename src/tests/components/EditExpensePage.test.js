import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let expense, editExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  expense = expenses[0];
  editExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage 
      expense={expense}
      editExpense={editExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
    />
  );
});

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  const { id, ...expenseDetails } = expense;
  wrapper.find('ExpenseForm').prop('onSubmit')(expenseDetails);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(id, expenseDetails);
});

test('should handle startRemoveExpense', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startRemoveExpense).toHaveBeenLastCalledWith(expense.id);
});
