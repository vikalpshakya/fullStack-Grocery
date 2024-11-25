export const setAllProducts = (products) => {
    return {
        type: "SET_ALL_PRODUCT",
        products: products,
    };
};

export const getAllProducts = (products) => {
    return {
        type: "GET_ALL_PRODUCT",
    };
};