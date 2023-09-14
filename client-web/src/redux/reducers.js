const initialState = {
    login: false,
    newUser: false,
    isLoading: false,
    email: "",
    patientDid: "",
    patientName: "",
    patientRecord: {},

}

const dataReducer = (state = initialState, action) => {
    switch(action.type) {

        case 'SET_LOGIN' :
            return {
                ...state,
                groupMember: action.payload,
            }

        case 'SET_NEW_USER' :
            return {
                ...state,
                newUser: action.payload,
            }

        case 'SET_IS_LOADING' :
            return {
                ...state,
                isLoading: action.payload,
            }

        case 'SET_EMAIL' : 
            return {
                ...state,
                email: action.payload,
            }

        case 'SET_PATIENT_DID' :
            return {
                ...state,
                patientDid: action.payload,
            }

        case 'SET_PATIENT_NAME' :
            return {
                ...state,
                patientName: action.payload,
            }
        
        case 'SET_PATIENT_RECORD' :
            return {
                ...state,
                patientRecord: action.payload,
            }
        
        default :
            return state;
    }
}

export default dataReducer;