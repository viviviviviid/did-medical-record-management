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

export const setEmail = (item) => {
    return {
        type: 'SET_EMAIL',
        payload: item,
    }
}

export const setPatientDid = (item) => {
    return {
        type: 'SET_PATIENT_DID',
        payload: item,
    }
}

export const setPatientName = (item) => {
    return {
        type: 'SET_PATIENT_NAME',
        payload: item,
    }
}

export const setPatientRecord = (item) => {
    return {
        type: 'SET_PATIENT_RECORD',
        payload: item,
    }
}