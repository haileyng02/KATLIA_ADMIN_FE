import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import appApi from "./api/appApi";
import * as routes from "./api/apiRoutes";
import { signIn } from "./actions/auth";
import { Main, Orders, Products, Import, Staff, User, Promotion, Statistic, Login, NotFound } from './pages';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {currentUser} = useSelector((state)=>state.user);
  const [role, setRole] = useState();
  const [loading,setLoading] = useState(true);

  //Get user me
  const getUserMe = async (item) => {
    setLoading(true);
    try {
      const result = await appApi.get(
        routes.USER_ME,
        routes.getAccessTokenHeader(item.token)
      );
      dispatch(signIn({ ...item, ...result.data }));
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const item = JSON.parse(loggedInUser);

      const now = new Date();
      const expiry = new Date(item.expiry);
      if (now < expiry) {
        getUserMe(item)
      }
      else {
        localStorage.removeItem('user');
        navigate('/login');
      }
    }
    else {
      navigate('/login');
    }
  }, [])

  useEffect(()=>{
    if (currentUser) {
      setRole(currentUser.role);
    }
  },[currentUser])
  
  return (
    <Routes>
      <Route path='/' element={<Main loading={loading}/>}>
        {role && <>
          <Route index element={role === 'STORAGE' ? <Products /> : <Orders />} />
          {(role === 'SALES' || role === 'ADMIN') && <Route path='orders' element={<Orders />} />}
          <Route path='products' element={<Products />} />
          {(role === 'STORAGE' || role === 'ADMIN') && <Route path='import' element={<Import />} />}
          {role === 'ADMIN' && <>
            <Route path='staff' element={<Staff />} />
            <Route path='user' element={<User />} />
            <Route path='discount' element={<Promotion />} />
            <Route path='statistic' element={<Statistic />} />
          </>}
        </>}
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='*' element={loading ? <Main/> : <NotFound />} />
    </Routes>
  );
}

export default App;
