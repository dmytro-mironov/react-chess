
const initialState ={
    fields: [],
    chooseFiel: false,
}

const fieldsReducer = (state = initialState, actions) => {
    switch(actions.type){
        case 'SET_FIELDS': 
            return {
                ...state,
                fields: actions.payload
            }
        break;
        case 'SET_CHOOSE_FIELD':
            return {
                ...state,
                chooseFiel: actions.payload
            }
        default: 
            return state;
    }
}

export default fieldsReducer;