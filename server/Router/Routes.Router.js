require('dotenv').config();
const express = require('express');
const Router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const {
  registerUser,
  loginUser,
  githubLogin,
  googleLogin,
} = require('../controller/authController.controller');

Router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (name === '' || email === '' || password === '') {
      return res.status(400).send('Please fill mandory fileds');
    }
    const user = await registerUser(name, email, password);

    res.status(201).send({
      message: 'Registrartion successfull',
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      error: 'Bad Request',
      description: error.message,
    });
  }
});

Router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email === '' || password === '') {
      return res.status(400).send('Please fill mandory fileds');
    }

    const token = await loginUser(email, password);

    res.status(201).send({
      message: 'Login successfull',

      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      
      error: 'Bad Request',
      description: error.message,
    });
  }
});

Router.get('/github-login/:code', async (req, res, next) => {
  try {
    let code = req.params.code;
    // console.log(code);

    let { token } = await githubLogin(code);
    // let {token, user} = await githubLogin(code);

    return res.send({
      // data: {token,user} // instead of user profile, we should generate and send auth token
      data: { token }, // instead of user profile, we should generate and send auth token
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
});

Router.post('/google', async (req, res) => {

  try {

    const { token } = req.body;

    console.log(token);
  
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    // const { name, email, picture } = ticket.getPayload();
    // console.log(name,email,picture);
    const data = ticket.getPayload();
    // console.log(data);
    const newToken = await googleLogin(data);

   
  
    res.send({
      token: newToken,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
    });
  }
 
});

module.exports = Router;
