export const getAccessTokenHeader = token => ({
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

//GET ALL PRODUCTS
export const GET_ALL_PRODUCTS = '/product-admin/getAllProducts'

//GET UNDELETED PRODUCTS
export const GET_UNDELETED_PRODUCTS = '/product-admin/getUndeletedProducts'

//GET ALL STAFF
export const GET_ALL_STAFF = '/staff/getAllStaff'