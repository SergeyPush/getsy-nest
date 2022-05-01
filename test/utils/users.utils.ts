import * as casual from 'casual';
export const getRandomUser = () => {
  return {
    firstName: casual.first_name,
    lastName: casual.last_name,
    email: casual.email,
    password: '123456',
  };
};

export const getInvalidUser = () => [
  {
    payload: {
      firstName: '',
      lastName: 'Folks',
      email: 'gingerfolks@mail.com',
      password: '123456',
    },
    expected: ['firstName must be a string'],
  },
  {
    payload: {
      firstName: 'Ginger',
      lastName: '',
      email: 'gingerfolks@mail.com',
      password: '123456',
    },
    expected: ['lastName must be a string'],
  },
  {
    payload: {
      firstName: 'Ginger',
      lastName: 'Folks',
      email: '',
      password: '123456',
    },
    expected: ['email must be an email'],
  },
  {
    payload: {
      firstName: 'Ginger',
      lastName: 'Folks',
      email: 'gingerfolks@mail.com',
      password: '',
    },
    expected: ['password should not be empty'],
  },
];
