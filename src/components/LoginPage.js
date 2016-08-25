import React, { Component } from 'react';
import LoginForm from './LoginForm';

export default class LoginPage extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center">Login!!</h1>
        <LoginForm />
      </div>
    )
  }
}
