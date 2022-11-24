import Main from "./pages/Main";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Storage from "./pages/Storage";
import Staff from "./pages/Staff";
import User from "./pages/User";
import Promotion from "./pages/Promotion";
import Statistic from "./pages/Statistic";

//Public routes
const publicRoutes = [
];

//Private routes
const privateRoutes = [
];

//App menu routes
const navRoutes = [
    { path: '/orders', component: Orders },
    { path: '/products', component: Products },
    { path: '/storage', component: Storage },
    { path: '/staff', component: Staff },
    { path: '/user', component: User },
    { path: '/promotion', component: Promotion },
    { path: '/statistic', component: Statistic },
];

export { publicRoutes, privateRoutes, navRoutes }