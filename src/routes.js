import Main from "./pages/Main";
import Orders from "./pages/Orders";

//Public routes
const publicRoutes = [
];

//Private routes
const privateRoutes = [
];

//App menu routes
const navRoutes = [
    { path: '/orders', component: Orders },
];

export { publicRoutes, privateRoutes, navRoutes }