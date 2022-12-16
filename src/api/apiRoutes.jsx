export const getAccessTokenHeader = token => ({
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

//GET ALL PRODUCTS
export const GET_ALL_PRODUCTS = '/product-admin/getAllProducts'

