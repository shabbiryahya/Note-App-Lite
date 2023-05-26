import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import RegistrationForm from './component/RegistrationForm/RegistrationForm';
import LoginForm from './component/LoginForm/LoginForm';
import Router from './routes/router.routes';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import AuthContextProvider from './Context/AuthContextProvider';
import { Provider } from 'react-redux';
import reduxStore from './Redux/store';



// console.log(process.env.REACT_APP_BASE_URL);
function App() {
  // const [form, setForm] = useState('login');
  return (
    <div className="App">
    <ToastContainer />

      <header className="App-header">
        <Provider store={reduxStore} >

<AuthContextProvider>

        <NavLink to="/"><img src={logo} className="App-logo" alt="logo"  /></NavLink> 
        
        <Router/>
</AuthContextProvider>
</Provider>

      </header>
    </div>
  );
}

export default App;
