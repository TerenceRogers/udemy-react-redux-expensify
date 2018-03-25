import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { },
  });
  expect(wrapper.state().error.length).toBeGreaterThan(0)
  expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
  const value = 'new description';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state().description).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test('should set note on textarea change', () => {
  const value = 'new note';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state().note).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test('should set amount on input change with valid data', () => {
  const value = '123.45';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state().amount).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test('should not set amount on input change with invalid data', () => {
  // Amount only allows two decimal places
  const value = '123.4567';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state().amount).toBe('');
  expect(wrapper).toMatchSnapshot();
});

test('should call onSubmit prop for valid form submission', () => {
  const expense = expenses[0];
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expense} onSubmit={onSubmitSpy}/>)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { },
  });
  const { id, ...submittedProperties } = expense;
  expect(wrapper.state().error).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith(submittedProperties);
});

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);
  expect(wrapper.state().createdAt).toEqual(now);
});

test('should set calendarFocus on change', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
  expect(wrapper.state().calendarFocused).toBe(focused);
});