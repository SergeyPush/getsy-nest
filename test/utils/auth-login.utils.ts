export const getNegativeUserData = () => [
  {
    payload: {
      email: '',
      password: '12345678',
    },
    expected: ['email must be an email'],
  },
  {
    payload: {
      email: 'testemail@mail.com',
      password: '',
    },
    expected: ['password should not be empty'],
  },
  {
    payload: {
      email: 'testemail@mail.com',
      password: null,
    },
    expected: ['password must be a string', 'password should not be empty'],
  },
  {
    payload: {
      email: null,
      password: '123456',
    },
    expected: ['email must be an email', 'email must be a string'],
  },
];
