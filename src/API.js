import axios from 'axios';
import RouteActions from './actions/RouteActions';

const API = {
  register(user) {
    axios.post('/api/users/register', user)
      .then(res => {
        RouteActions.route('/login');
      })
      .catch(console.error);
  }
}

export default API;
