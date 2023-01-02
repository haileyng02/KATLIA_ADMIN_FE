export const getPromotionProducts = (products) => {
    return {
        type: "GET_PROMOTION_PRODUCTS",
        payload: products,
    };
};

export const getProducts = (products,nextId) => {
    return {
        type: "GET_PRODUCTS",
        payload: {products,nextId},
    };
};