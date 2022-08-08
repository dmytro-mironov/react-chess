
const initialState ={
    fields: [],
}

const fieldsReducer = (state = initialState, actions) => {
    switch(actions.type){
        case 'SET_FIELDS': 
            return {
                ...state,
                fields: actions.payload
            }
        break;
        default: 
            return state;
    }
}

export default fieldsReducer;