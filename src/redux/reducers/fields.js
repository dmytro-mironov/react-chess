
const initialState ={
    fields: [],
    chooseFiel: false,
    turnGamer: 1,
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
        case 'SET_TURN_PLAYER':
            return {
                ...state,
                turnGamer: actions.payload == 1 ? 2 : 1
            }
        default: 
            return state;
    }
}

export default fieldsReducer;