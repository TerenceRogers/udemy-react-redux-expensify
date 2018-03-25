import moment from 'moment';

const expenses = [
  {
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: moment(0).add(1, 'days').valueOf(),
  }, {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 135000,
    createdAt: moment(0).add(2, 'days').valueOf(),
  }, {
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 12500,
    createdAt: moment(0).add(3, 'days').valueOf(),
  }
];

export default expenses;