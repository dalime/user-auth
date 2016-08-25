import API from '../API';

const UserActions = {
  register(user) {
    API.register(user);
  },
  login(attempt) {
    API.login(attempt);
  }
};

export default UserActions;
