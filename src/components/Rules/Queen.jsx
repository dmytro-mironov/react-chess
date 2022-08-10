import Cell from "../Cell";
import { clickFigule } from "../Field";


export const checkFieldQueen = (field, x, y, currentFigure, check = true) => {

    //check is field and field is not our figure
    if(field?.gamer !== currentFigure.gamer && field && check){
        field.html = <Cell key={x+''+y} style="can_stay" figure={field.html?.props.figure} 
                                    onClick={() => clickFigule(x, y)}/>;
        field.can_stay = true;
        if(field.gamer !== currentFigure.gamer && field?.isFigure){
            check = false;
        }
    }else if((field?.type === 'queen' || field?.type === 'king') && field?.gamer == currentFigure.gamer){
        //check to possible change beetwen king and queen
        field.html = <Cell key={x+''+y} style="can_stay" figure={field.html?.props.figure} 
                                    onClick={() => clickFigule(x, y)}/>;
        field.change_place = true;
        check = false;
    }else{
        check = false;
    }
    return check;
}

const showRulesQueen = ({fields, currentFigure}) => {

    let iterator = 1;

    let coordinates = {
        bottomR: true,
        bottom: true,
        bottomL: true,
        left: true,
        topL: true,
        top: true,
        topR: true,
        right: true,
    };
    while(iterator < 5){
        const localIterator = iterator;
        //bottom right
        coordinates.bottomR = checkFieldQueen(
            fields[currentFigure.x+localIterator+''+parseInt(currentFigure.y+localIterator)], 
            currentFigure.x+localIterator, 
            currentFigure.y+localIterator,
            currentFigure,
            coordinates.bottomR
        );
        //bottom
        coordinates.bottom = checkFieldQueen(
            fields[parseInt(currentFigure.x+localIterator)+''+parseInt(currentFigure.y)], 
            currentFigure.x+localIterator, 
            parseInt(currentFigure.y),
            currentFigure,
            coordinates.bottom
        );
        //bottom left
        coordinates.bottomL = checkFieldQueen(
            fields[parseInt(currentFigure.x+localIterator)+''+parseInt(currentFigure.y-localIterator)], 
            currentFigure.x+localIterator, 
            currentFigure.y-localIterator,
            currentFigure,
            coordinates.bottomL
        );
        //left
        coordinates.left = checkFieldQueen(
            fields[parseInt(currentFigure.x)+''+parseInt(currentFigure.y-localIterator)], 
            currentFigure.x, 
            currentFigure.y-localIterator,
            currentFigure,
            coordinates.left
        );
         //left top
         coordinates.topL = checkFieldQueen(
            fields[parseInt(currentFigure.x-localIterator)+''+parseInt(currentFigure.y-localIterator)], 
            currentFigure.x-localIterator, 
            currentFigure.y-localIterator,
            currentFigure,
            coordinates.topL
        );
        //top
        coordinates.top = checkFieldQueen(
            fields[parseInt(currentFigure.x-localIterator)+''+parseInt(currentFigure.y)], 
            currentFigure.x-localIterator, 
            currentFigure.y,
            currentFigure,
            coordinates.top
        );
        //right top
        coordinates.topR = checkFieldQueen(
            fields[parseInt(currentFigure.x-localIterator)+''+parseInt(currentFigure.y+localIterator)], 
            currentFigure.x-localIterator, 
            currentFigure.y+localIterator,
            currentFigure,
            coordinates.topR
        );
        //right
        coordinates.right = checkFieldQueen(
            fields[parseInt(currentFigure.x)+''+parseInt(currentFigure.y+localIterator)], 
            currentFigure.x, 
            currentFigure.y+localIterator,
            currentFigure,
            coordinates.right
        );
        iterator++;
    }
    
}

export default showRulesQueen;