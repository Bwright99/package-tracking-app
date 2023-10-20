import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [resetPasswordRequested, setResetPasswordRequested] = useState(false)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = () => {
    let loginIdentifier = ''

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (username.match(emailPattern)) {
      loginIdentifier = 'email'
    } else {
      loginIdentifier = 'username'
    }

    const loginInfo =
      loginIdentifier === 'email'
        ? `Login with email: ${username} and password: ${password}`
        : `Login with username: ${username} and password: ${password}`

    //navigateToHomePage();
  }

  const handleForgotPassword = () => {
    console.log('Sending password reset link to:', username)
    setResetPasswordRequested(true)
  }

  return (
    <div style={styles.container}>
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
      <p style={styles.signupText}>
        New Here? <span style={styles.signupLink}>Sign Up</span>
      </p>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '100px',
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
    width: '80%',
  },
  input: {
    width: '100%',
    padding: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  button: {
    width: '80%',
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
  signupText: {
    marginBottom: '10px',
  },
  signupLink: {
    color: '#007BFF',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}

export default Login
