import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { loadGapiInsideDOM } from 'gapi-script';
const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const baseurl = process.env.REACT_APP_BASE_URL;
console.log(googleClientID);

const LoginWithGoogle = () => {
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      await loadGapiInsideDOM();
    })();
  });

  const responseGoogle = async (googleData) => {
    console.log(googleData);
    try {
      const res = await fetch(`${baseurl}/auth/google`, {
        method: 'POST',
        body: JSON.stringify({
          token: googleData.tokenId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
           const token = await res.json();
      // store returned user somehow
      localStorage.setItem('note_auth_token', token.token);
      console.log(token);

      nav('/');
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div>
      {/* <h1>Google OAuth Login</h1> */}
      <GoogleLogin
        clientId={googleClientID}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        scope="openid profile email"
      />
    </div>
  );
};

export default LoginWithGoogle;
