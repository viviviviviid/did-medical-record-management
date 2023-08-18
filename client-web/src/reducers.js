const initialState = {
    login: false,

}

const dataReducer = (state = initialState, action) => {
    switch(action.type) {

        case 'SET_LOGIN' :
            return {
                ...state,
                groupMember: action.payload,
            }
        
        default :
            return state;
    }
}

export default dataReducer;