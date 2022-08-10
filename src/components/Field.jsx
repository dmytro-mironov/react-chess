import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChooseField, setControl, setFields, setHistory, setTurnGamer } from "../redux/actions/fields";
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
import showRulesKing from "./Rules/King";

const controlSelector = (e) => {

    const fields = store.getState().fieldsReducer.fields;
    const control = store.getState().fieldsReducer.controlKeyBoardPos;
    const chooseFiel = store.getState().fieldsReducer.chooseFiel;

    let oldControl = {...control};
    
    let style_old = '';
    //clean old
    if(fields[oldControl.x+''+oldControl.y].can_stay){
        style_old="can_stay"
    }else if(chooseFiel.x == oldControl.x && chooseFiel.y == oldControl.y){
        style_old="choose"
    }
    
    fields[oldControl.x+''+oldControl.y].html = <Cell key={oldControl.x+''+oldControl.y} figure={fields[oldControl.x+''+oldControl.y].html.props.figure} style={style_old} onClick={() => clickFigule(oldControl.x,oldControl.y)}/>;

    if(e.keyCode == 38 || e.keyCode == 87){
        control.x = control.x != 1 ? --control.x : control.x;
    }else if(e.keyCode == 40 || e.keyCode == 83){
        control.x = control.x != 5 ? ++control.x : control.x;
    }else if(e.keyCode == 39 || e.keyCode == 68){
        control.y = control.y != 5 ? ++control.y : control.y;
    }else if(e.keyCode == 37 || e.keyCode == 65){
        control.y = control.y != 1 ? --control.y : control.y;
    }
    
    //new 
    if(e.keyCode == 13){
        clickFigule(control.x, control.y);
    }
    fields[control.x+''+control.y].html = <Cell key={control.x+''+control.y} figure={fields[control.x+''+control.y].html.props.figure} style="control_select" onClick={() => clickFigule(control.x,control.y)}/>;
   
    store.dispatch(setControl({x:control.x, y: control.y}));
    store.dispatch(setFields(fields));
    

}
//fefresh field can stay to false
const refreshField = ({ fields, store, currentFigure}) => {
    Object.keys(fields).map((key,_)=> {
        if(fields[key].can_stay){
            fields[key].can_stay = false;
            fields[key].html = <Cell key={ fields[key].x+''+ fields[key].y}  figure={ fields[key].html.props.figure} onClick={() => clickFigule(fields[key].x,fields[key].y)}/>
        }else if(fields[key].change_place){
            fields[key].change_place = false;
            fields[key].html = <Cell key={ fields[key].x+''+ fields[key].y}  figure={ fields[key].html.props.figure} onClick={() => clickFigule(fields[key].x,fields[key].y)}/>
        }
    });

    store.dispatch(setFields(fields));
    store.dispatch(setChooseField(false));
}

export const clickFigule = (x,y) => {

    const turnGamer = store.getState().fieldsReducer.turnGamer;
    const chooseFiel = store.getState().fieldsReducer.chooseFiel;
    let fields = store.getState().fieldsReducer.fields;
    let isMat = store.getState().fieldsReducer.isMat;

    if(isMat) return;

    let currentFigure = fields[x+''+y];
    //field choose and can move
    if(chooseFiel && currentFigure?.can_stay == true){

        //new place
        currentFigure.html = <Cell key={x+''+y} figure={fields[chooseFiel.x+''+chooseFiel.y].html.props.figure} onClick={() => clickFigule(x,y)}/>
        currentFigure.isFigure = true;
        currentFigure.type = fields[chooseFiel.x+''+chooseFiel.y].type;
        currentFigure.gamer = fields[chooseFiel.x+''+chooseFiel.y].gamer;
        
        //old place
        fields[chooseFiel.x+''+chooseFiel.y].html = <Cell key={chooseFiel.x+''+chooseFiel.y} onClick={() => clickFigule(chooseFiel.x,chooseFiel.y)}/>
        fields[chooseFiel.x+''+chooseFiel.y].isFigure = false;
        fields[chooseFiel.x+''+chooseFiel.y].type = false;
        fields[chooseFiel.x+''+chooseFiel.y].gamer = false;

        store.dispatch(setHistory({
            gamer: currentFigure.gamer,
            from: {x: chooseFiel.x, y: chooseFiel.y},
            to: {x,y},
            figure: currentFigure.type
        }));

        
        if(currentFigure.type == 'front'){
            showRulesFront({fields,currentFigure,x,y});
        }else if(currentFigure.type == 'horse'){
            showRulesHorse({fields,currentFigure,x,y});
        }else if(currentFigure.type == 'queen'){
            showRulesQueen({fields,currentFigure,x,y});
        }else if(currentFigure.type == 'king'){
            showRulesKing({fields,currentFigure,x,y});
        }
        
        store.dispatch(setTurnGamer(currentFigure.gamer));
        refreshField({fields, store, currentFigure});
        console.dir(store.getState().fieldsReducer.isMat);

    }else if(chooseFiel && currentFigure?.change_place == true){
        //change place beetwen queen and king
        let oldFigure = {...currentFigure};

        //new place
        currentFigure.html = <Cell key={x+''+y} x={x} y={y} figure={fields[chooseFiel.x+''+chooseFiel.y].html.props.figure} onClick={() => clickFigule(x,y)}/>
        currentFigure.isFigure = true;
        currentFigure.type = fields[chooseFiel.x+''+chooseFiel.y].type;
        currentFigure.gamer = fields[chooseFiel.x+''+chooseFiel.y].gamer;

        //old place
        fields[chooseFiel.x+''+chooseFiel.y].html = <Cell key={chooseFiel.x+''+chooseFiel.y} figure={oldFigure.html.props.figure} onClick={() => clickFigule(chooseFiel.x,chooseFiel.y)}/>
        fields[chooseFiel.x+''+chooseFiel.y].isFigure = true;
        fields[chooseFiel.x+''+chooseFiel.y].type = oldFigure.type;
        fields[chooseFiel.x+''+chooseFiel.y].gamer = oldFigure.gamer;

        store.dispatch(setHistory({
            gamer: currentFigure.gamer,
            from: {x: chooseFiel.x, y: chooseFiel.y},
            to: {x,y},
            figure: currentFigure.type
        }));

        store.dispatch(setTurnGamer(currentFigure.gamer));
        refreshField({fields, store, currentFigure});


    }else if(currentFigure?.isFigure && !chooseFiel && currentFigure.gamer == turnGamer){
        //select figure
        currentFigure.html = <Cell key={x+''+y} figure={currentFigure.html.props.figure} style="choose" onClick={() => clickFigule(x,y)}/>

        if(currentFigure.type == 'front' && currentFigure.x <= 5 && currentFigure.x >= 0){
            fields = showRulesFront({fields,currentFigure,x,y});
        }else if(currentFigure.type == 'horse' && currentFigure.x <= 5 && currentFigure.x >= 0){
            fields = showRulesHorse({fields,currentFigure,x,y});
        }else if(currentFigure.type == 'queen' && currentFigure.x <= 5 && currentFigure.x >= 0){
            fields = showRulesQueen({fields,currentFigure,x,y});
        }else if(currentFigure.type == 'king' && currentFigure.x <= 5 && currentFigure.x >= 0){
            fields = showRulesKing({fields,currentFigure,x,y});
        }

        store.dispatch(setFields(fields));
        store.dispatch(setChooseField({x,y}));

    }else if(currentFigure?.isFigure && chooseFiel && currentFigure.x == chooseFiel.x && currentFigure.y == chooseFiel.y){
        //clear all if you click again
        currentFigure.html = <Cell key={x+''+y} figure={currentFigure.html.props.figure} onClick={() => clickFigule(x,y)}/>
        refreshField({fields, store, currentFigure});
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
    const { fields, isMat, turnGamer } = useSelector(({fieldsReducer}) => {
        return { fields:fieldsReducer.fields, isMat: fieldsReducer.isMat, turnGamer: fieldsReducer.turnGamer }
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
        setFigure({fiel, x:1, y:3, figure: whiteKing,type: "king", gamer: 1});
        setFigure({fiel, x:1, y:2, figure: whiteQueen,type: "queen", gamer: 1});
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
        setFigure({fiel, x:5, y:2, figure: blackQueen,type: "queen", gamer: 2});
        setFigure({fiel, x:5, y:3, figure: blackKing,type: "king", gamer: 2});
        setFigure({fiel, x:5, y:4, figure: blackHorse,type: "horse", gamer: 2});

        //set cursor 
        fiel['33'].html = <Cell key={'33'} style="control_select" onClick={() => clickFigule(3,3)}/>;

        document.addEventListener('keyup', (e) => controlSelector(e), true);
        
        dispatch(setFields(fiel));
    }, []);
    
    return (
        <div style={{'width': '100%'}}>
            <div className="board">
                {Object.keys(fields).map((key,index)=> fields[key].html)}
            </div>
            <div>
                {isMat ? (
                    <div>Player {turnGamer == 1 ? 2 : 1} made mat</div>
                ) : ''}
            </div>
        </div>

    );
}

export default Field;