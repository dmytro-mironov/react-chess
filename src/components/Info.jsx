import React from "react";
import { useSelector } from "react-redux";

const Info = () => {
    const { turnGamer } = useSelector(({fieldsReducer}) => {
        return { turnGamer:fieldsReducer.turnGamer }
    });
    const player = {
        1: 'White',
        2: 'Black'
    }

    return (
        <div>Player turn: {player[turnGamer]}</div>
    )

}

export default Info;