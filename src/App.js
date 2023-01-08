import { useEffect } from 'react';
import { useNavigate,Routes, Route  } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "./actions/auth";
import appApi from "./api/appApi";
import * as routes from "./api/apiRoutes";
import { Main, Orders, Products, Import, Staff, User, Promotion, Statistic, Login } from './pages';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Get user me
  const getUserMe = async (item) => {
    try {
      const result = await appApi.get(
        routes.USER_ME,
        routes.getAccessTokenHeader(item.token)
      );
      dispatch(signIn({...item,...result.data}));
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
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
