import React from 'react';
import Styles from '../LoginForm/LoginForm.module.css';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai';
import LoginWithGoogle from '../Google/GoogleLogin';


const baseurl = process.env.REACT_APP_BASE_URL;
const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;

const LoginForm = () => {
  let [details, setDetails] = useState({
    email: '',
    password: '',
  });
  const onChange = (e) => {
    let { name, value } = e.target;
    setDetails((prevState) => ({ ...prevState, [name]: value }));
  };
  const nav = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (details.password === '' || details.email === '') {
      alert('Please fill all the fields');
      return;
    }
    fetch(`${baseurl}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(details),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log('Response Status:', response.status);
        return response.json(); // Parse response body as JSON
      })
      .then((data) => {
        if (data.error) {
          if (
            data.description === 'User is not existed! please Register first.'
          ) {
            alert(data.description);
            nav('/register');
            return;
          }
          alert(data.description);
          return;
        }
        console.log('Response Data:', data);
        alert('Login Successfull');
        localStorage.setItem('note_auth_token', data.token);
        setDetails({
          ...details,
          email: '',
          password: '',
        });
        nav('/');
      })
      .catch((error) => {
        console.log('Error:', error);
        alert(error.message);
      });
    // console.log(details);
  };
  return (
    <div>
      {/* <h1>Login Form</h1> */}
      <fieldset>
        <legend>Login Form</legend>
        <form onSubmit={onSubmit}>
          {/* <label htmlFor="email">Email:</label> */}
          <input
            style={{ textAlign: 'center' }}
            name="email"
            type="email"
            placeholder="Enter Email..."
            onChange={onChange}
            value={details.email}
            required
          />
          <br />
          {/* <label htmlFor="password">Password:</label> */}
          <input
            style={{ textAlign: 'center' }}
            name="password"
            type="password"
            placeholder="Enter Password..."
            onChange={onChange}
            value={details.password}
            required
          />
          <br />

          <input type="submit" value="Login" />
        </form>
      </fieldset>
      <NavLink to="/Register">
        <button style={{ padding: 2 }}>Register</button>
      </NavLink>
      <NavLink
        to={`https://github.com/login/oauth/authorize?client_id=${clientId}`}
        className={Styles.gitNavLink}
      >
        <div className={Styles.Github}>
          <p>Github-Login</p>
          <AiFillGithub />
        </div>
      </NavLink>

      {/* <NavLink to={``} className={Styles.gitNavLink}>
        <div className={Styles.Github}>
          <p>Google-Login</p>
          <AiFillGoogleCircle />
        </div>
      </NavLink> */}
      <LoginWithGoogle/>
    </div>
  );
};

export default LoginForm;
