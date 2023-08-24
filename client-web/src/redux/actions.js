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