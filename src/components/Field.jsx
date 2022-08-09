import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChooseField, setFields } from "../redux/actions/fields";
import store from "../redux/store";
import Cell from "./Cell";



const clickFigule = (x,y) => {

    const chooseFiel = store.getState().fieldsReducer.chooseFiel;
    const fields = store.getState().fieldsReducer.fields;
    //field choose and can move
    console.dir({x,y})
    if(chooseFiel){
        fields[x+''+y].html = <Cell key={x+''+y} x={x} y={y} figure={fields[chooseFiel.x+''+chooseFiel.y].html.props.figure} onClick={() => clickFigule(x,y)}/>
        fields[x+''+y].isFigure = true

        fields[chooseFiel.x+''+chooseFiel.y].html = <Cell key={chooseFiel.x+''+chooseFiel.y} x={chooseFiel.x} y={chooseFiel.y} onClick={() => clickFigule(chooseFiel.x,chooseFiel.y)}/>
        fields[chooseFiel.x+''+chooseFiel.y].isFigure = false
        
        store.dispatch(setFields(fields));
        store.dispatch(setChooseField(false));

    }else if(fields[x+''+y].isFigure){

        fields[x+''+y].html = <Cell key={x+''+y} x={x} y={y} figure={fields[x+''+y].html.props.figure} style="choose" onClick={() => clickFigule(x,y)}/>
        store.dispatch(setFields(fields));
        store.dispatch(setChooseField({x,y}));

    }


}

const setFigure = ({fiel, x,y, figure, img}) => {
    fiel[x+''+y].html = <Cell key={x+''+y} x={x} y={y} figure={figure} style="cursor" onClick={() => clickFigule(x,y)}/>;
    fiel[x+''+y].isFigure = true;
    return fiel;
}

const Field = ({ countField = 5}) => {

    const dispatch = useDispatch();
    const { fields } = useSelector(({fieldsReducer}) => {
        return { fields:fieldsReducer.fields }
    });


    useEffect(()=>{
        let fiel = {};
        for(let i = 1; i <= countField; i++){
            for(let j = 1; j <= countField; j++){
                fiel[i+''+j] = {
                    html: <Cell key={i+''+j} x={i} y={j} onClick={() => clickFigule(i,j)}/>,
                    x: i,
                    y: j,
                    isFigure: false,
                };
            }
        }
        
        setFigure({fiel, x:1, y:1, figure:'que',});
        setFigure({fiel, x:1, y:2, figure:'que',});
        setFigure({fiel, x:3, y:3, figure:'que',});

        
        dispatch(setFields(fiel));
    }, []);
    
    return (
        <div className="board">
            {Object.keys(fields).map((key,index)=> fields[key].html)}
        </div>
    );
}

export default Field;