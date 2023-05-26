import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
const baseurl = process.env.REACT_APP_BASE_URL;

const GithubLogin = () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const nav = useNavigate();
  console.log(code);
  useEffect(() => {
    if (code) {
      fetch(`${baseurl}/auth/github-login/${code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log(response);

          return response.json();
        })
        .then((result) => {
          if(result.message)
          {

            throw new Error(result.message)
          }
          console.log(result);
          console.log(result.data.token);
          let token = result.data.token;
          localStorage.setItem('note_auth_token', token);

          // window.location = "/";
          nav('/');
        })
        .catch((err) => {
          console.log(err);
          console.log(err.message);
          // alert('Error while logging you in with github');
          alert(err.message);

          nav('/login');
        });
    }
  }, [code]);

  return <div>Loading...</div>;
};

export default GithubLogin;
