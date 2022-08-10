export const setFields = (fields) => ({
    type: "SET_FIELDS",
    payload: fields
})

export const setChooseField = (field) => ({
    type: "SET_CHOOSE_FIELD",
    payload: field
});

export const setTurnGamer = (player) => ({
    type: "SET_TURN_PLAYER",
    payload: player
});