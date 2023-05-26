const User = require('../model/Register.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const { getAccessToken, getUserProfile } = require('../services/github');

dotenv.config();

const secret = process.env.JWT_SECRET;
// console.log("secret",secret);

const registerUser = async (name, email, password) => {
  login_method = 'email-password';
  let user = await User.findOne({ email });
  console.log('user', user);

  if (user) {
    if (user.login_method === 'google') {
      throw new Error(
        `Yo're already Register With Google!Please Login With Google!`
      );
    }
    if (user.login_method === 'github') {
      throw new Error(
        `Yo're already Register With Google!Please Login With Github!`
      );
    }
    // if (user) {
    throw new Error('User is already exist with this email ! please login');
    // }
  }

  user = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, 5),
    login_method,
  });

  user = user.toJSON();

  delete user.password;
  return user;
};

const loginUser = async (email, password) => {
  // console.log(email, password);
  let user = await User.findOne({ email });

  if (!user) {
    throw new Error('User is not existed! please Register first.');
  }

  if (user.login_method === 'email-password') {
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('wrong credintials');
    }

    user = user.toJSON();
    delete user.password;

    let token = jwt.sign(user, secret);

    return token;
  } else if (user.login_method === 'google') {
    throw new Error(`Yo're Register This Mail Via Google`);
  } else if (user.login_method === 'github') {
    throw new Error(`Yo're Register This Mail Via Github`);
  }
};
const githubLogin = async (code) => {
  // Exchange this code to get access token
  // https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github
  // console.log(code);
  let accessToken = await getAccessToken(code);
  // console.log(accessToken);

  // Use the access token to get the user profile
  // https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#3-use-the-access-token-to-access-the-api
  let userProfile = await getUserProfile(accessToken);

  console.log(userProfile);

  // Check if this user is already added into our database
  let user = await User.findOne({
    // login_method: 'github',
    // githubUsername: userProfile.login,
    email: userProfile.email,
  });

  if (user) {
    if (user.login_method === 'email-password') {
      throw new Error(
        `Yo're already Register With this Email Please Sign-in through password`
      );
    }
    if (user.login_method === 'google') {
      throw new Error(
        `Yo're already Register With Google!Please Login With Google!`
      );
    }
  }

  if (!user) {
    user = await User.create({
      name: userProfile.name,
      email: userProfile.email,
      login_method: 'github',
      githubUsername: userProfile.login,
      image: userProfile.avatar_url,
      githubAuth: true,
    });
  }

  user = user.toJSON();
  delete user.password;

  let token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
    },
    secret
  );

  // let token = generateToken({
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     image: user.image,
  //     expiresAt: new Date("2023-05-12") // 5 days expiry or so
  // })

  return { token, user };
};

const googleLogin = async (data) => {
  const { name, email, sub, picture } = data;

  let user = await User.findOne({
    login_method: 'google',
    googleUsername: sub,
    // email,
  });
 
 

  if (!user) {
    user = await User.create({
      name,
      email,
      login_method: 'google',
      googleUsername: sub,
      image: picture,
      googleAuth: true,
    });
  }

  // console.log(user);

  // user=user.toJSON();
  // delete user.password;
  let token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
    },
    secret
  );

  console.log(token);
  return token;

  // name: userProfile.name,
  // email: userProfile.email,
  // login_method: 'github',
  // githubUsername: userProfile.login,
  // image: userProfile.avatar_url,
  // githubAuth: true,
  // 100368067295595172427
};

module.exports = {
  registerUser,
  loginUser,
  githubLogin,
  googleLogin,
};
