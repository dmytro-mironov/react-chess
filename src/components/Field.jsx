import React from "react";
import { useEffect } from "react";
import Cell from "./Cell";

const Field = ({ countField = 5}) => {

    const [ field, setField ] = React.useState([]);


    useEffect(()=>{
        let fiel = [];
        for(let i = 0; i < countField; i++){
            for(let j = 0; j < countField; j++){
                fiel.push({
                    html: <Cell key={i+''+j} x={i} y={j} figure="qen"/>,
                    x: i,
                    y: j,
                });
            }
        }
        setField(fiel);
    },[]);

    
    return (
        <div class="board">
            {field.map((elem) => elem.html)}
        </div>
    );
}

export default Field;