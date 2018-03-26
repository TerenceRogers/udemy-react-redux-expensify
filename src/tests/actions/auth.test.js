import { login, logout } from '../../actions/auth';

test('should return login action object with uid', () => {
  const uid = 'abc123456789';
  const expectedAction = {
    type: 'LOGIN',
    uid,
  };
  const action = login(uid);
  expect(action).toEqual(expectedAction);
});

test('should return logout action object', () => {
  const expectedAction = {
    type: 'LOGOUT'
  };
  const action = logout();
  expect(action).toEqual(expectedAction);
});