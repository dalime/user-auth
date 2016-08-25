import React, { Component } from 'react';
import UserActions from '../actions/UserActions';

export default class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    }

    this._onInputChange = this._onInputChange.bind(this);
    this._submit = this._submit.bind(this);
  }

  _onInputChange(e) {
    let key = e.target.dataset.statekey;
    let value = e.target.value;

    // dynamic state manipulation
    this.setState({
      [key]: value
    });
  }

  _submit(e) {
    e.preventDefault();
    UserActions.login(this.state);
  }

  render() {
    let { username, password } = this.state;

    return (
      <div>
        <form onSubmit={this._submit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              required
              value={username}
              data-statekey='username'
              onChange={this._onInputChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
              value={password}
              data-statekey='password'
              onChange={this._onInputChange}
            />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    )
  }
}
