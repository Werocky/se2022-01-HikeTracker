import 'bootstrap/dist/css/bootstrap.min.css'
//import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import AuthContext from './AuthContext'
import MainLayout from './Layout-components/MainLayout';
import API from './API';
import { LoginComponent } from './Layout-components/LoginComponent';
import { RegisterComponent } from './Layout-components/RegisterComponent';
import HikeDetails from './Layout-components/HikeDetails';
//import AddHike from './Layout-components/AddHike';
import ProfilePage from './Layout-components/ProfilePage';
import HutsPage from './Layout-components/Huts-components/HutsPage';
import ParkingForm from './Layout-components/ParkingForm';

import Register from "./pages/Signup";
import Login from './pages/Login'
import Hikes from './pages/Hikeslist'
import Huts from './pages/Hutslist'
import AddHike from './components/forms/AddHike'
import "./style.css"
import "tailwindcss/lib/css/preflight.css"

function App() {

  const [auth, setAuth] = useState({  // login information
    login: false,
    user: { role: '' },
  });

  const login = async (email, password) => {
    const user = await API.logIn(email, password)
    setAuth({
      login: true,
      user: user,
    });
  };

  const logout = async (navigate) => {
    await API.logOut();
    setAuth({
      login: false,
      user: { role: '' },
    })
    navigate('/');
  };

  const register = async (credentials) => {
    await API.register(credentials.email, credentials.Role, credentials.Salt, credentials.Hash)
  }

  useEffect(() => {   // check login     
    const checkAuth = async () => {
      const user = await API.getUserInfo();
      if (user) {
        setAuth({
          login: true,
          user: user,
        });
      }
    };
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={auth}>   {/* this is used to pass user information*/}
        <AppLayout login={login} logout={logout} register={register} setLogged={setAuth} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

function AppLayout(props) {
  const auth = useContext(AuthContext);   // contains user information 



  return (
    <Routes>
      <Route path='/' element={
        <MainLayout
          logout={props.logout}
        />
      } />
      <Route path='/:hikeID' element={
        <HikeDetails logout={props.logout} />
      } />
      <Route path='/register' element={
              <Register/>
        // <RegisterComponent register={props.register} />
      } />
      <Route path='/login' element={
          <Login/>
        // < LoginComponent  login={props.login} />
      } />
      <Route path='/addHike' element={
        <AddHike />
      } />
      <Route path='/hikes' element={
            <Hikes />
      } />
      <Route path='/huts' element={
            <Huts />
      } />

      <Route path='/profile/:userId' element={
        <ProfilePage logout={props.logout} />
      } />
      {/*<Route path='/huts' element={*/}
      {/*  <HutsPage logout={props.logout} />*/}
      {/*} />*/}
      <Route path='/addParkingLot' element={
        <ParkingForm />
      } />
    </Routes>
  );
}



export default App;
