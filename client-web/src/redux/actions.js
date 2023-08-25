export const setLogin = (item) => {
    return {
        type: 'SET_LOGIN',
        payload: item,
    };
};

export const setNewUser = (item) => {
    return {
        type: 'SET_NEW_USER',
        payload: item,
    }
}

export const setIsLoading = (item) => {
    return {
        type: 'SET_IS_LOADING',
        payload: item,
    }
}