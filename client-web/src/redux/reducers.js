const initialState = {
    login: false,
    newUser: false,

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
        
        default :
            return state;
    }
}

export default dataReducer;