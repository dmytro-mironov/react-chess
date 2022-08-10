
const initialState ={
    fields: [],
    chooseFiel: false,
    turnGamer: 1,
    history: [],
    controlKeyBoardPos: {x: 3, y:3},
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
                turnGamer: actions.payload === 1 ? 2 : 1
            }
        case 'SET_HISTORY':
            return {
                ...state,
                history: [...state.history, actions.payload],
            }
        case 'SET_CONTROL':
            return {
                ...state,
                controlKeyBoardPos: actions.payload
            }
        default: 
            return state;
    }
}

export default fieldsReducer;