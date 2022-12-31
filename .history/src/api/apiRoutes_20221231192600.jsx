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

//ADD AN IMAGE FOR PRODUCT
export const ADD_AN_IMAGE_FOR_PRODUCT = '/product-admin/addAnImageForProduct'
export const getAddAnImageForProductBody = (productId, colorId) => ({
  params: {
    productId: productId,
    colorId: colorId
  }
})

//SET DEFAULT PIC FOR PRODUCT
export const SET_DEFAULT_PIC_FOR_PRODUCT = (id) => `/product-admin/setDefaultPicForProduct/${id}`
export const getSetDefaultPicForProductIdParams = (id) => ({
  params: {
    id: id
  }
})

//EDIT PRODUCT INFO
export const EDIT_PRODUCT_INFO = (id) => `/product-admin/editProductInfo/${id}`
export const getEditProductInfoIdParams = (id) => ({
  params: {
    id: id
  }
})
export const getEditProductInfoBody = (name, description, price) => ({
  name: name,
  description: description,
  price: price
})

//DELETE PRODUCT IMAGE BY COLOR
export const DELETE_PRODUCT_IMAGE_BY_COLOR = '/product-admin/deleteProductImageByColor'
export const getDeleteProductImageByColorParams = (productId, colorId) => ({
  params: {
    productId: productId,
    colorId: colorId
  }
})

//DELETE ALL IMAGE OF PRODUCT
export const DELETE_ALL_IMAGE_OF_PRODUCT = (id) => `/product-admin/deleteAllImageOfProduct/${id}`
export const getDeleteAllImageOfProductParams = (id) => ({
  params: {
    id: id
  }
})

//DELETE AN IMAGE
export const DELETE_AN_IMAGE = (id) => `/product-admin/deleteAnImage/${id}`
export const getDeleteAnImageParams = (id) => ({
  params: {
    id: id
  }
})

//DELETE SOME IMAGES
export const DELETE_SOME_IMAGES = '/product-admin/deleteSomeImages'
export const getDeleteSomeImages = (idList) => ({
  idList: idList
})

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

//STAFF IMPORT HISTORY
export const STAFF_IMPORT_HISTORY = '/staff-import/history'

//STAFF-IMPORT/ IMPORT INFO
export const IMPORT_INFO = (id) => `/staff-import/importInfo/${id}`
export const getImportInfo = (id) => ({
  params: {
    id: id
  }
})

//STAFF-IMPORT/ DETAIL
export const STAFF_IMPORT_DETAIL = (id) => `/staff-import/detail/${id}`
export const getStaffImportDetail = (id) => ({
  params: {
    id: id
  }
})

//IMPORT FORM INFO
export const IMPORT_FORM_INFO = '/items/getImportFormInfo'

//PRODUCT SIZE FOR IMPORT
export const PRODUCT_SIZE_FOR_IMPORT = (id) => `/items/getProductSizeForImport/${id}`
export const getProductSizeForImportIdParams = (id) => ({
  params: {
    id: id
  }
}) 

//PRODUCT COLOR FOR IMPORT
export const PRODUCT_COLOR_FOR_IMPORT = (id) => `/items/getProductColorForImport/${id}`
export const getProductColorForImportIdParams = (id) => ({
  params: {
    id: id
  }
})

//GET ITEMS IN EXISTING FORM
export const ITEMS_IN_EXISTING_FORM = '/items/getItemsInExistingForm'

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

//ADD NEW DISCOUNT
export const ADD_NEW_DISCOUNT = '/discount/addNewDiscount'
export const getAddNewDiscountBody = (discountName, percent, startAt, endAt) => ({
  discountName: discountName,
  percent: percent,
  startAt: startAt,
  endAt: endAt
})

//EDIT LIST PRODUCTS FOR DISCOUNT
export const EDIT_LIST_PRODUCTS_FOR_DISCOUNT = (id) => `/discount/editListProductsForDiscount/${id}`
export const getEditListProductsForDiscountIdPrams = (id) => ({
  params: {
    id: id
  }
})

//EDIT DISCOUNT INFO
export const EDIT_DISCOUNT_INFO = (id) => `/discount/editDiscountInfo/${id}`
export const getEditDiscountInfoIdParams = (id) => ({
  params: {
    id: id
  }
})

//DELETE DISCOUNT
export const DELETE_DISCOUNT = (id) => `/discount/deleteDiscount/${id}`
export const getDeleteDiscountIdParams = (id) => ({
  params: {
    id: id
  }
})

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