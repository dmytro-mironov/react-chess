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

export const setHistory = (turn) => ({
    type: "SET_HISTORY",
    payload: turn
})

export const setControl = (position) => ({
    type: "SET_CONTROL",
    payload: position
});

export const setMat = (mat) => ({
    type: "SET_MAT",
    payload: mat,
});