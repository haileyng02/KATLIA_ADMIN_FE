export const getAccessTokenHeader = (token) => ({
  headers: {
    Authorization: "Bearer " + token,
  },
});

//SIGN IN WITH EMAIL AND PASSWORD
export const SIGN_IN = "/auth/signInWithEmailAndPassword";
export const getSigninBody = (email, password) => ({
  email: email,
  password: password,
});

//GET ALL PRODUCTS
export const GET_ALL_PRODUCTS = "/product-admin/getAllProducts";

//GET UNDELETED PRODUCTS
export const GET_UNDELETED_PRODUCTS = "/product-admin/getUndeletedProducts";

//ADD PRODUCT
export const ADD_PRODUCT = "/product-admin/addProducts";
export const getAddProductBody = (
  productId,
  name,
  description,
  categoryId,
  price,
  sizeList,
  colorIdList
) => ({
  productId: productId,
  name: name,
  description: description,
  categoryId: categoryId,
  price: price,
  sizeList: sizeList,
  colorIdList: colorIdList,
});

//DELETE PRODUCT
export const DELETE_PRODUCT = (id) => `/product-admin/deleteProduct/${id}`
export const getDeleteProductBody = (id) => ({
  params: {
    id: id
  }
})

//GET ALL STAFF
export const GET_ALL_STAFF = "/staff/getAllStaff";

//UPDATE STAFF
export const UPDATE_STAFF = (id) => `/staff/updateStaff/${id}`;
export const getUpdateStaffIdParams = (id) => ({
  params: {
    id: id
  }
});

//ADD STAFF
export const ADD_STAFF = "/staff/addStaff";
export const getAddStaffBody = (email, role, startAt, status) => ({
  email: email,
  role: role,
  startAt: startAt,
  status: status,
});

//GET ALL USER
export const GET_ALL_USER = "/user/getAllUser";

//UPDATE ORDER STATUS
export const UPDATE_ORDER_STATUS = (id) => `/staff-order/updateOrderStatus/${id}`
export const getUpdateOrderStatusBody = (id) => ({
  params: {
    id: id
  }
})

//CANCEL ORDER
export const CANCEL_ORDER = (id) => `/staff-order/cancelOrder/${id}`
export const getCancelOrderParams = (id) => ({
  params: {
    id: id
  }
})
export const getCancelOrderBody = (cancelReason) => ({
  body: {
    cancelReason: cancelReason
  }
})

//GET ALL ORDER
export const GET_ALL_ORDER = "/staff-order/getAllOrder";

//GET DETAIL ORDER
export const GET_DETAIL_ORDER = (id) => `/staff-order/getDetailOrder/${id}`;
export const getDetailOrderBody = (id) => ({
  params: {
    id: id
  }
});

//GET PRICE ORDER
export const GET_PRICE_ORDER = (id) => `/staff-order/getPriceOrder/${id}`;
export const getPriceOrderBody = (id) => ({
  params: {
    id: id
  }
});

//GET ALL COLORS
export const GET_ALL_COLORS = '/filter/getAllColors'

//GET ALL CATEGORY
export const GET_ALL_CATEGORY = '/category/getAll'

//GET ALL DISCOUNT
export const GET_ALL_DISCOUNT_LIST = '/discount/getAllDiscountList'

//GET STATISTIC USER
export const GET_STATISTIC_USER = '/statistics/statisticsUser'

//NEW ORDER OF MONTH 
export const NEW_ORDER_OF_MONTH = '/statistics/newOrderOfMonth'

//ORDER PERCENT GROWTH
export const ORDER_PERCENT_GROWTH = '/statistics/orderPercentGrowth'

//REVENUE OF MONTH
export const REVENUE_OF_MONTH = '/statistics/revenueOfMonth'

//REVENUE PERCENT GROWTH
export const REVENUE_PERCENT_GROWTH = '/statistics/revenuePercentGrowth'

//ORDER PER MONTH
export const ORDER_PER_MONTH = (year) => `/statistics/orderPerMonth/${year}`
export const getOrderPerMonthBody = (year) => ({
  params: {
    year: year
  }
})

//REVENUE PER MONTH
export const REVENUE_PER_MONTH = (year) => `/statistics/revenuePerMonth/${year}`
export const getRevenuePerMonthBody = (year) => ({
  params: {
    year: year
  }
})

//EXPENDITURE OF MONTH
export const EXPENDITURE_OF_MONTH = '/statistics/expenditureOfMonth'