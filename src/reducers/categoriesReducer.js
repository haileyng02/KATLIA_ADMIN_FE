const initialState = {
    categories: null,
}

export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CATEGORIES':
            return {
                categories: action.payload,
            }
        default:
            return state;
    }
};

export default categoriesReducer;