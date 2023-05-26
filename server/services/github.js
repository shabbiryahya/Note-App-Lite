require('dotenv').config();
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// console.log(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

// export async function getAccessToken(code) {
// const response = await axios.post('https://github.com/login/oauth/access_token', {
//     code,
//     client_id: GITHUB_CLIENT_ID,
//     client_secret: GITHUB_CLIENT_SECRET
// }, {
//     headers: {
//         'Accept': 'application/json'
//     }
// })

// // console.log('Access token response', response.data)

// return response.data.access_token;
// }C:\Users\Toshiba\.nvs\node\16.17.1\x64\node.exe
const getAccessToken = async (code) => {
  try {
    // console.log("getaccesstoken",code);

    const response = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
        }),
      }
    );
    const result = await response.json();
    console.log(result);
    return result.access_token;
  } catch (error) {
    console.log(error);
    console.log(error.message);
    throw new Error(error.message);
  }
};

const getUserProfile = async (accessToken) => {
  // console.log(accessToken);

  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

// export async function getUserProfile(accessToken) {
//     const response = await axios.get('https://api.github.com/user', {
//         headers: {
//             'Accept': 'application/json',
//             'Authorization': `Bearer ${accessToken}`
//         }
//     })

//     // console.log('User Profile response', response.data)

//     return response.data;
// }

module.exports = {
  getAccessToken,
  getUserProfile,
};
