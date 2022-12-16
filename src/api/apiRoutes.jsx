export const getAccessTokenHeader = token => ({
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

//GET ALL PRODUCTS
export const GET_ALL_PRODUCTS = '/product-admin/getAllProducts'

//GET UNDELETED PRODUCTS
export const GET_UNDELETED_PRODUCTS = '/product-admin/getUndeletedProducts'

//ADD PRODUCT
export const ADD_PRODUCT = '/product-admin/addProducts'
export const getAddProductBody = (productId, name, description, categoryId, price, sizeList, colorIdList) => ({
  productId: productId,
  name: name,
  description: description,
  categoryId: categoryId,
  price: price,
  sizeList: sizeList,
  colorIdList: colorIdList
})

//GET ALL STAFF
export const GET_ALL_STAFF = '/staff/getAllStaff'

//GET ALL USER
export const GET_ALL_USER = '/user/getAllUser'

//GET ALL ORDER
export const GET_ALL_ORDER = '/staff-order/getAllOrder'