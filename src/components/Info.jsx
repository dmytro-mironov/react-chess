import React from "react";
import { useSelector } from "react-redux";

const Info = () => {
    const { turnGamer, history } = useSelector(({fieldsReducer}) => {
        return { 
            turnGamer: fieldsReducer.turnGamer,
            history: fieldsReducer.history
         }
    });
    const player = {
        1: 'White',
        2: 'Black'
    }
    const symbolFiedlBy = {
        1: 'a',
        2: 'b',
        3: 'c',
        4: 'd',
        5: 'e',
    }
    return (
        <div style={{'min-width': '200px'}}>
            <div>Player turn: {player[turnGamer]}</div>
            <div className="history">
                <ul>
                    {history.map((elem)=>{
                        return <li key={elem.figure+elem.from.x+elem.from.y}>
                                    <div>Figure: {elem.figure} </div>
                                    <div>From: {elem.from.x}{symbolFiedlBy[elem.from.y]}</div>
                                    <div>To: {elem.to.x}{symbolFiedlBy[elem.to.y]}</div>
                                    <div>Gamer: {elem.gamer}</div>
                            </li>
                    })}
                </ul>
            </div>
        </div>
        
    )

}

export default Info;