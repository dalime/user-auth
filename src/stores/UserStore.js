import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';
import UserActions from '../actions/UserActions';
import Constants from '../Constants';

let _profile = null;

export default class UserStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch(action.type) {
        case Constants.RECEIVE_PROFILE:
          _profile = action.profile;
          this.emit('CHANGE');
          console.log ('_profile:', _profile);
          break;
      }
    });

    if(document.cookie.includes('authtoken')) {
      UserActions.getProfile();
    }
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  get() {
    return _profile;
  }
}

export default new UserStore();
