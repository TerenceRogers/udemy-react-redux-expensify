import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should render expenses summary with 0 expenses', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={0} expensesTotal={0} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render expenses summmary with positive values', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={5} expensesTotal={1234567} />);
  expect(wrapper).toMatchSnapshot();
});
