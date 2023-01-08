const initialState = {
    promoProducts: null,
    allProducts: null,
    nextProductId : null
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PROMOTION_PRODUCTS':
            return {
                ...state,
                promoProducts: action.payload,
            }
        case 'GET_PRODUCTS':
            return {
                ...state,
                allProducts: action.payload.products,
                nextProductId: action.payload.nextId
            }
        default:
            return state;
    }
};

export default productReducer;