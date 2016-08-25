import React, { Component } from 'react';

export default class UserWelcome extends Component {
  render() {
    let { profile } = this.props;

    if (!profile) {
      return <p></p>
    }

    return (
      <p className="navbar-text">
        Welcome {profile.username}
      </p>
    )
  }
}
