import React, {Component} from 'react';
import {Redirect, withRouter} from "react-router-dom";
import Storage, {STORAGE_SESSION} from '../utils/storage';
import api from '../api';

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      login: '',
      password: '',
      error: null
    };
  }

  componentDidMount() {
    this.setState({isAuthenticated: !!Storage.get(STORAGE_SESSION)});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    api.Session.singup({username: this.state.login, password: this.state.password})
      .then((token) => {
        Storage.set(STORAGE_SESSION, token);
        this.props.history.push('/');
      })
      .catch((error) => this.setState({error: error.message}));
  };

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value});
  };

  handleGoToSignInPage = (e) => {
    e.preventDefault();
    this.props.history.push('/signin');
  };

  render() {
    if (this.state.isAuthenticated) return <Redirect to='/'/>;
    return (
      <section className='hero'>
        <form
          className='d-flex flex-column card'
          onSubmit={this.handleSubmit}
        >
          <div className='d-flex flex-column'>
            <input
              placeholder='login'
              value={this.state.login}
              type='text'
              name='login'
              onChange={this.handleChange}
            />
            <label className='text-danger'>{this.state.error}</label>
          </div>
          <div className='d-flex flex-column'>
            <input
              placeholder='password'
              value={this.state.password}
              type='password'
              name='password'
              onChange={this.handleChange}
            />
            <label className='text-danger'>{this.state.error}</label>
          </div>
          <div className='d-flex flex-column'>
            <button
              className='btn-primary p-3 mt-3'
              disabled={!this.state.login || !this.state.password}
              type='submit'
            >
              signup
            </button>
            <button
              onClick={this.handleGoToSignInPage}
              className='btn-primary p-3 mt-2'
            >
              login
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(SignUp);
