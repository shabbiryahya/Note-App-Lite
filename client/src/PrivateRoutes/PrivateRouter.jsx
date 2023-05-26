import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
 let token=localStorage.getItem("note_auth_token");
 console.log(token);

  return token? children : <Navigate to="/login" />;
};

export default PrivateRouter;
