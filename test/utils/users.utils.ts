import * as casual from 'casual';
export const getRandomUser = () => {
  return {
    firstName: casual.first_name,
    lastName: casual.last_name,
    email: casual.email,
    password: casual.password,
  };
};
