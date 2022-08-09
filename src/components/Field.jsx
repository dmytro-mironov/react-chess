import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChooseField, setFields } from "../redux/actions/fields";
import store from "../redux/store";
import Cell from "./Cell";

import whitePawn from "../assets/pawn-w.png";
import blackPawn from "../assets/pawn-b.png";
import blackHorse from "../assets/horse-b.png";
import whiteHorse from "../assets/horse-w.png";
import whiteQueen from "../assets/queen-w.png"
import blackQueen from "../assets/queen-b.png"
import blackKing from "../assets/king-b.png"
import whiteKing from "../assets/king-w.png"
import showRulesFront from "./Rules/Front";
import showRulesHorse from "./Rules/Horse";
import showRulesQueen from "./Rules/Queen";


export const clickFigule = (x,y) => {

    const chooseFiel = store.getState().fieldsReducer.chooseFiel;
    const fields = store.getState().fieldsReducer.fields;

    let currentFigure = fields[x+''+y];
    //field choose and can move
    if(chooseFiel && currentFigure?.can_stay == true){

        //new place
        currentFigure.html = <Cell key={x+''+y} x={x} y={y} figure={fields[chooseFiel.x+''+chooseFiel.y].html.props.figure} onClick={() => clickFigule(x,y)}/>
        currentFigure.isFigure = true;
        currentFigure.type = fields[chooseFiel.x+''+chooseFiel.y].type;
        currentFigure.gamer = fields[chooseFiel.x+''+chooseFiel.y].gamer;
        
        //old place
        fields[chooseFiel.x+''+chooseFiel.y].html = <Cell key={chooseFiel.x+''+chooseFiel.y} x={chooseFiel.x} y={chooseFiel.y} onClick={() => clickFigule(chooseFiel.x,chooseFiel.y)}/>
        fields[chooseFiel.x+''+chooseFiel.y].isFigure = false;
        fields[chooseFiel.x+''+chooseFiel.y].type = false;
        fields[chooseFiel.x+''+chooseFiel.y].gamer = false;

        //fefresh field can stay to false
        Object.keys(fields).map((key,index)=> {
            if(fields[key].can_stay){
                fields[key].can_stay = false;
                fields[key].html = <Cell key={ fields[key].x+''+ fields[key].y} x={fields[key].x} y={fields[key].y} figure={ fields[key].html.props.figure} onClick={() => clickFigule(fields[key].x,fields[key].y)}/>
            }
        });

        store.dispatch(setFields(fields));
        store.dispatch(setChooseField(false));


    }else if(currentFigure?.isFigure && !chooseFiel){
        //select figure
        currentFigure.html = <Cell key={x+''+y} x={x} y={y} figure={currentFigure.html.props.figure} style="choose" onClick={() => clickFigule(x,y)}/>

        if(currentFigure.type == 'front' && currentFigure.x <= 5 && currentFigure.x >= 0){
            showRulesFront({fields,currentFigure,x,y});
        }else if(currentFigure.type == 'horse' && currentFigure.x <= 5 && currentFigure.x >= 0){
            showRulesHorse({fields,currentFigure,x,y});
        }else if(currentFigure.type == 'queen' && currentFigure.x <= 5 && currentFigure.x >= 0){
            showRulesQueen({fields,currentFigure,x,y});
        }

        store.dispatch(setFields(fields));
        store.dispatch(setChooseField({x,y}));

    }else if(currentFigure?.isFigure && chooseFiel && currentFigure.x == chooseFiel.x && currentFigure.y == chooseFiel.y){
        //clear all if you click again
        currentFigure.html = <Cell key={x+''+y} x={x} y={y} figure={currentFigure.html.props.figure} onClick={() => clickFigule(x,y)}/>
        Object.keys(fields).map((key,index)=> {
            if(fields[key].can_stay){
                fields[key].can_stay = false;
                fields[key].html = <Cell key={ fields[key].x+''+ fields[key].y} x={fields[key].x} y={fields[key].y} figure={ fields[key].html.props.figure} onClick={() => clickFigule(fields[key].x,fields[key].y)}/>
            }
        });
        store.dispatch(setFields(fields));
        store.dispatch(setChooseField(false));
    }
}

const setFigure = ({fiel, x,y, figure, type, gamer}) => {
    fiel[x+''+y].html = <Cell key={x+''+y} x={x} y={y} figure={figure} style="cursor" onClick={() => clickFigule(x,y)}/>;
    fiel[x+''+y].isFigure = true;
    fiel[x+''+y].type = type;
    fiel[x+''+y].gamer = gamer;

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
        
        setFigure({fiel, x:1, y:4, figure: whiteHorse,type: "horse", gamer: 1});
        setFigure({fiel, x:1, y:2, figure: whiteKing,type: "king", gamer: 1});
        setFigure({fiel, x:1, y:3, figure: whiteQueen,type: "queen", gamer: 1});
        setFigure({fiel, x:2, y:1, figure: whitePawn,type: "front", gamer: 1});
        setFigure({fiel, x:2, y:2, figure: whitePawn,type: "front", gamer: 1});
        setFigure({fiel, x:2, y:3, figure: whitePawn,type: "front", gamer: 1});
        setFigure({fiel, x:2, y:4, figure: whitePawn,type: "front", gamer: 1});
        setFigure({fiel, x:2, y:5, figure: whitePawn,type: "front", gamer: 1});


        setFigure({fiel, x:4, y:1, figure: blackPawn,type: "front", gamer: 2});
        setFigure({fiel, x:4, y:2, figure: blackPawn,type: "front", gamer: 2});
        setFigure({fiel, x:4, y:3, figure: blackPawn,type: "front", gamer: 2});
        setFigure({fiel, x:4, y:4, figure: blackPawn,type: "front", gamer: 2});
        setFigure({fiel, x:4, y:5, figure: blackPawn,type: "front", gamer: 2});
        setFigure({fiel, x:5, y:3, figure: blackQueen,type: "queen", gamer: 2});
        setFigure({fiel, x:5, y:2, figure: blackKing,type: "king", gamer: 2});
        setFigure({fiel, x:5, y:4, figure: blackHorse,type: "horse", gamer: 2});

        /* setFigure({fiel, x:3, y:3, figure: blackQueen,type: "queen", gamer: 2}); */

        
        dispatch(setFields(fiel));
    }, []);
    
    return (
        <div className="board">
            {Object.keys(fields).map((key,index)=> fields[key].html)}
        </div>
    );
}

export default Field;