const initialState = {
    colors: null,
}

export const colorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_COLORS':
            return {
                colors: action.payload,
            }
        default:
            return state;
    }
};

export default colorsReducer;