import authReducer from '../../reducers/auth';

test('should return object with uid on login', () => {
  const uid = 'abc123456789';
  const action = {
    type: 'LOGIN',
    uid 
  };
  const expected = { uid };
  const state = authReducer(undefined, action);
  expect(state).toEqual(expected);
});

test('should clear uid on logout', () => {
  const action = {
    type: 'LOGOUT',
  };
  const expected = { };
  const state = authReducer({ uid: 'abc123456789' }, action);
  expect(state).toEqual(expected);
});