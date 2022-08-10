import Cell from "../Cell";
import { clickFigule } from "../Field";
import { checkFieldQueen } from "./Queen";

const showRulesKing = ({fields, currentFigure}) => {

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

    while(iterator < 2){
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

export default showRulesKing;