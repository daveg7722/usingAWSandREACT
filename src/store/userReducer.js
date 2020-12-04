const initialState = {
    username: "",
    id: "",
    email: "",
    phone_number: "",
    signedIn: false
}

const userReducer = (state = initialState, action) => {
    switch(action.type){        
        case 'SET_USER' :
            let user = action.payload;
            console.log(JSON.stringify(user));
            return {
                ...state,
                ...user,
                signedIn: true
            };
        case 'REMOVE_USER' :
            console.log('initial state ' + initialState)
            return initialState;
        default: return state
    }
}

export default userReducer;