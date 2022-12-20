const initialState = {
    currentUser: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return {
                currentUser: { ...action.payload }
            };

        case 'LOG_OUT':
            return {
                currentUser: null
            };
        default:
            return state;
    }
};

export default authReducer;