import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import { signIn } from "./actions/auth";
import { Main, Orders, Products, Import, Staff, User, Promotion, Statistic, Login } from './pages';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const item = JSON.parse(loggedInUser);

      const now = new Date();
      const expiry = new Date(item.expiry);
      if (now < expiry) {
        dispatch(signIn(item));
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

  return (
    <Routes>
      <Route path='/' element={<Main />}>
        <Route index element={<Orders />} />
        <Route path='orders' element={<Orders />} />
        <Route path='products' element={<Products />} />
        <Route path='import' element={<Import />} />
        <Route path='staff' element={<Staff />} />
        <Route path='user' element={<User />} />
        <Route path='discount' element={<Promotion />} />
        <Route path='statistic' element={<Statistic />} />
      </Route>
      <Route path='login' element={<Login />} />
    </Routes>
  );
}

export default App;
