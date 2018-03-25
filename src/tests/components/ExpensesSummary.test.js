import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should render ExpensesSummary correctly with 1 expense', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={1500} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummary correctly with more than 1 expense', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={3} expensesTotal={123456789} />);
  expect(wrapper).toMatchSnapshot();
});
