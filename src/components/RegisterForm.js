import React, { Component } from 'react';

export default class RegisterForm extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password1: '',
      password2: ''
    }

    this._onInputChange = this._onInputChange.bind(this);
  }

  _onInputChange(e) {
    let key = e.target.dataset.statekey;
    let value = e.target.value;

    let newState = {};
    newState[key] = value;

    // dynamic state manipulation
    this.setState({
      [key]: value
    });
  }

  render() {
    let { username, password1, password2 } = this.state;

    return (
      <div>
        <form>
          <div className="form-group">
            <label>Email address</label>
            <input type="text" className="form-control" placeholder="Username" value={username} data-statekey='username' onChange={this._onInputChange}/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" value={password1} data-statekey='password1' onChange={this._onInputChange}/>
          </div>
          <div className="form-group">
            <label>Password (again)</label>
            <input type="password" className="form-control" placeholder="Password" value={password2} data-statekey='password2' onChange={this._onInputChange}/>
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    )
  }
}
