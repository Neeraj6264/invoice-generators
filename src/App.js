// src/App.js
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import InvoiceForm from './components/InvoiceForm';

import {
  auth,
  provider
} from './firebase';

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      email: '',
      password: '',
      isRegistering: false,
    };
  }

  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  handleEmailSignup = async () => {
    const { email, password } = this.state;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  handleEmailLogin = async () => {
    const { email, password } = this.state;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  handleLogout = async () => {
    await signOut(auth);
  };

  toggleRegistering = () => {
    this.setState({ isRegistering: !this.state.isRegistering });
  };

  render() {
    const { user, email, password, isRegistering } = this.state;

    return (
      <div className="App d-flex flex-column align-items-center justify-content-center w-100 mt-5">
        {user ? (
          <>
            <h5>Welcome, {user.displayName || user.email}</h5>
            <button className="btn btn-danger mb-3" onClick={this.handleLogout}>
              Logout
            </button>
            <Container>
              <InvoiceForm />
            </Container>
          </>
        ) : (
          <div className="d-flex flex-column align-items-center">
            <h2>{isRegistering ? 'Create an account' : 'Login'}</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.handleInputChange}
              className="form-control my-2"
              style={{ width: '250px' }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleInputChange}
              className="form-control my-2"
              style={{ width: '250px' }}
            />
            {isRegistering ? (
              <button className="btn btn-success mb-2" onClick={this.handleEmailSignup}>
                Sign Up
              </button>
            ) : (
              <button className="btn btn-primary mb-2" onClick={this.handleEmailLogin}>
                Login
              </button>
            )}
            <button className="btn btn-secondary mb-3" onClick={this.toggleRegistering}>
              {isRegistering ? 'Have an account? Login' : 'New user? Register'}
            </button>
            <hr style={{ width: '200px' }} />
            <button className="btn btn-outline-dark" onClick={this.handleGoogleLogin}>
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
