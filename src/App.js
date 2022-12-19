import { Routes, Route } from 'react-router-dom';
import { Main, Orders, Products, Import, Staff, User, Promotion, Statistic, Login } from './pages';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />}>
        <Route index element={<Orders />} />
        <Route path='orders' element={<Orders />} />
        <Route path='products' element={<Products />} />
        <Route path='import' element={<Import />} />
        <Route path='staff' element={<Staff />} />
        <Route path='user' element={<User />} />
        <Route path='promotion' element={<Promotion />} />
        <Route path='statistic' element={<Statistic />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
