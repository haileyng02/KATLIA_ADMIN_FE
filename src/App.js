import { Routes, Route } from 'react-router-dom'
import Main from './pages/Main';
import Orders from './pages/Orders';
import { publicRoutes, privateRoutes, navRoutes } from './routes'

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Main />}>
          {navRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Route>
        {privateRoutes.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />
        })}
      </Routes>
    </div>
  );
}

export default App;
