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

//GET ALL STAFF
export const GET_ALL_STAFF = "/staff/getAllStaff";

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

//GET ALL ORDER
export const GET_ALL_ORDER = "/staff-order/getAllOrder";
