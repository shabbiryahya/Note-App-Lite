import React, { useState } from 'react';
import Styles from '../RegistrationForm/RegistrationForm.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiFillGithub,AiFillGoogleCircle } from 'react-icons/ai';
// import ParentComponent from '../Google/GoogleLogin';
import LoginWithGoogle from '../Google/GoogleLogin';
// ParentComponent


const baseurl = process.env.REACT_APP_BASE_URL;
const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;

// console.log(`${baseurl}/register`);
// console.log(clientId);

const RegistrationForm = () => {
  const nav = useNavigate();
  let [details, setDetails] = useState({
    name: '',
    email: '',
    password: '',
  });
  const onChange = (e) => {
    let { name, value } = e.target;
    setDetails((prevState) => ({ ...prevState, [name]: value.toLowerCase() }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (details.name === '' || details.name === '' || details.email === '') {
      alert('Please fill all the fields');
      return;
    }

    fetch(`${baseurl}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(details),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log(response);
        console.log('Response Status:', response.status);

        return response.json(); // Parse response body as JSON
      })
      .then((data) => {
        if (data.error) {
          if (
            data.description ===
            'User is already exist with this email ! please login'
          ) {
            alert(data.description);
            nav('/login');
            return;
          }
          alert(data.description);
          return;
        }
        console.log('Response Data:', data);
        alert('Registration Successfull');
        nav('/login');
      })
      .catch((error) => {
        console.log('Error:', error);
        // alert(error.message);
        console.log('Hi');
      });

    setDetails({
      ...details,
      name: '',
      email: '',
      password: '',
    });
  };
  return (
    <div>
      {/* <h1>Registration Form</h1> */}
      <fieldset>
        <legend>Registration Form</legend>
        <form onSubmit={onSubmit}>
          {/* <label htmlFor="name">Name:</label> */}
          <input
            name="name"
            type="text"
            placeholder="Enter Name..."
            onChange={onChange}
            value={details.name}
            required
          />
          <br />
          {/* <label htmlFor="email">Email:</label> */}
          <input
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
            name="password"
            type="password"
            placeholder="Enter Password..."
            onChange={onChange}
            value={details.password}
            required
          />
          <br />

          <input type="submit" value="Register" />
        </form>
      </fieldset>

      <NavLink to="/login">
        <button>Login</button>
      </NavLink>
      <br />
      <br />
      <NavLink
        to={`https://github.com/login/oauth/authorize?client_id=${clientId}`}
        className={Styles.gitNavLink}
      >
        <div className={Styles.Github}>
          <p>Github-Login</p>
          <AiFillGithub />
        </div>
      </NavLink>

      {/* <NavLink
        to={``}
        className={Styles.gitNavLink}
      >
        <div className={Styles.Github}>
          <p>Google-Login</p>
          <AiFillGoogleCircle/>
        </div>
      </NavLink> */}
      <LoginWithGoogle/>
      {/* <ParentComponent/> */}
    </div>
  );
};

export default RegistrationForm;
