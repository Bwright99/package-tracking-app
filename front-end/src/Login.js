import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const api = {
  signUp: async (newUsername, newPassword) => {
    try {
      const response = await fetch(`http://localhost:2000/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
        }),
      });
      if (!response.ok) {
        throw new Error('Sign Up failed');
      }

      const userData = await response.json(); 
      console.log('User signed up successfully:', userData);

      return userData; 
    } catch (error) {
      console.error('Error during sign up:', error.message);
      throw error; 
    }
  },

  signIn: async (username, password) => {
    try {
      const response = await fetch(`http://localhost:2000/signIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Sign In failed');
      }

    } catch (error) {
      console.error('Error during sign in:', error.message);
    }
  },
};

const SignUp = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  const handleNewUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleNewEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleNewPhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const handleSignUp = async () => {
    try {
      const userData = await api.signUp(newUsername, newEmail, newPassword, newPhoneNumber);
      console.log('User signed up successfully:', userData);
    } catch (error) {
      console.error('Error during sign up:', error.message);
    }
  };

  return (
    <div style={{ ...styles.container, ...styles.signUpContainer }}>
      <h2 style={styles.title}>Sign Up</h2>
      <div style={styles.inputContainer}>
        <input
          type='text'
          placeholder='Username'
          value={newUsername}
          onChange={handleNewUsernameChange}
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <input
          type='text'
          placeholder='Email'
          value={newEmail}
          onChange={handleNewEmailChange}
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <input
          type='password'
          placeholder='Password'
          value={newPassword}
          onChange={handleNewPasswordChange}
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <input
          type='text'
          placeholder='Phone Number'
          value={newPhoneNumber}
          onChange={handleNewPhoneNumberChange}
          style={styles.input}
        />
      </div>
      <button onClick={handleSignUp} style={styles.button}>
        <Link to='/Home'>Sign Up</Link>
      </button>
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [resetPasswordRequested, setResetPasswordRequested] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      await api.signIn(username, password);
      console.log('User signed in successfully');
    } catch (error) {
      console.error('Error during sign in:', error.message);
    }
  };

  const handleForgotPassword = () => {
    console.log('Sending password reset link to:', username);
    setResetPasswordRequested(true);
  };

  return (
    <div style={styles.flexContainer}>
      {/* Login component */}
      <div style={{ ...styles.container, ...styles.loginContainer }}>
        <h2 style={styles.title}>Login</h2>
        <div style={styles.inputContainer}>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={handleUsernameChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
            style={styles.input}
          />
        </div>
        <button onClick={handleLogin} style={styles.button}>
          <Link to='/Home'>Login</Link>
        </button>
        <p style={styles.forgotPassword} onClick={handleForgotPassword}>
          Forgot Password?
        </p>
        {resetPasswordRequested && (
          <p style={styles.resetPasswordMessage}>
            Password reset link sent to {username}'s email.
          </p>
        )}
      </div>

      {/* Sign-up component */}
      <SignUp />
    </div>
  );
};

const styles = {
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    margin: 'auto',
    marginTop: '100px',
  },
  container: {
    width: '48%',
    padding: '40px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    borderBottom: '2px solid #007BFF',
    paddingBottom: '10px',
  },
  inputContainer: {
    marginBottom: '20px',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  button: {
    width: '100%',
    padding: '15px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  forgotPassword: {
    color: '#007BFF',
    textDecoration: 'underline',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  resetPasswordMessage: {
    color: 'green',
    marginBottom: '10px',
  },
  signUpContainer: {
    width: '48%',
  },
  loginContainer: {
    width: '48%',
  },
};

export default Login;
