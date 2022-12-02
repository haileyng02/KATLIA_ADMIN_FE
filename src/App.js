import { Routes, Route } from 'react-router-dom';
import 'antd/dist/reset.css';
import { Main, Orders, Products, Storage, Staff, User, Promotion, Statistic } from './pages';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />}>
        <Route index element={<Orders />} />
        <Route path='orders' element={<Orders />} />
        <Route path='products' element={<Products />} />
        <Route path='storage' element={<Storage />} />
        <Route path='staff' element={<Staff />} />
        <Route path='user' element={<User />} />
        <Route path='promotion' element={<Promotion />} />
        <Route path='statistic' element={<Statistic />} />
      </Route>
    </Routes>
  );
}

export default App;
