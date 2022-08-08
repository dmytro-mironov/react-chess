import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFields } from "../redux/actions/fields";
import Cell from "./Cell";


const clickFigule = (x) => {
    console.dir(x)
}

const setFigure = ({fiel, x,y, figure, img}) => {
    return fiel.map((item) => {
        if(item.x === x && item.y === y){
            item.html = <Cell key={x+''+y} x={x} y={y} figure={figure} style="cursor" onClick={() => clickFigule(x)}/>;
        }
    })
}

const Field = ({ countField = 5}) => {
    const dispatch = useDispatch();
    const { fields } = useSelector(({fieldsReducer}) => {
        return {fields:fieldsReducer.fields}
    });


    useEffect(()=>{
        let fiel = [];
        for(let i = 0; i < countField; i++){
            for(let j = 0; j < countField; j++){
                fiel.push({
                    html: <Cell key={i+''+j} x={i} y={j}/>,
                    x: i,
                    y: j,
                });
            }
        }
        
        setFigure({fiel, x:0, y:1, figure:'que',});
        setFigure({fiel, x:0, y:2, figure:'que',});
        setFigure({fiel, x:3, y:3, figure:'que',});

        dispatch(setFields(fiel));
    }, []);
    console.dir(fields)

    
    return (
        <div className="board">
            {fields.map((elem) => elem.html)}
        </div>
    );
}

export default Field;