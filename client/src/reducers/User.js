const initialState = {}
const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SAVE_USER': 
            return { ...action.payload}
        case 'UPDATE_USER':
            return {...state, ...action.payload}
        case 'REMOVE_USER': 
            return {}
        default: 
            return state
    }
}

export default userReducer