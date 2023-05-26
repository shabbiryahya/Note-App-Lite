import React from 'react'
import { Routes,Route, } from 'react-router-dom';
import RegistrationForm from '../component/RegistrationForm/RegistrationForm';
import LoginForm from '../component/LoginForm/LoginForm';
import Notes from '../component/Notes/Notes';
import PrivateRouter from '../PrivateRoutes/PrivateRouter';
import NotFound from '../component/404.jsx/NotFound';
import SingleNotes from '../component/SingleNotes.jsx/SingleNotes';
import EditNote from "../component/Notes/EditNote"
import GithubLogin from '../component/Github/GithubLogin';

const Router = () => {
  return (
   <Routes>
    <Route path="/" element={<PrivateRouter><Notes /></PrivateRouter>} />
    <Route path="/register" element={<RegistrationForm/> } />
    <Route path="/login" element={<LoginForm/> } />
    <Route path='/github-login/' element={<GithubLogin/>}/>
    <Route path="/notes/:id" element={<PrivateRouter><SingleNotes /></PrivateRouter>}/>
    <Route path="/notes/edit/:id" element={<PrivateRouter><EditNote/></PrivateRouter>}/>

    <Route path='*' element={<NotFound/>}/>
   </Routes>
  )
}

export default Router