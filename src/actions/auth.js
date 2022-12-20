export const signIn = (token) => {
    return {
        type: "SIGN_IN",
        payload: token,
    };
};

export const logOut = () => {
    return {
        type: 'LOG_OUT'
    }
}