import API from '../API';

const UserActions = {
  register(user) {
    API.register(user);
  },
  login(attempt) {
    API.login(attempt);
  },
  getProfile: API.getProfile
};

export default UserActions;
