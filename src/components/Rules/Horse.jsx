import { setMat } from "../../redux/actions/fields";
import store from "../../redux/store";
import Cell from "../Cell";
import { clickFigule } from "../Field";


const showRulesHorse = ({fields, currentFigure,x,y}) => {
    let direction = currentFigure.gamer === 1 ? 1 : -1;
  

    let coordinates = [
        {x:currentFigure.x + direction * 2,y:y-1},//check top left
        {x:currentFigure.x + direction * 2,y:parseInt(y)+1},//check top right
        {x:parseInt(currentFigure.x) + direction, y:parseInt(y) + direction * 2},//check right top
        {x:parseInt(currentFigure.x) + direction, y:parseInt(y) - direction * 2}//check left top
    ];

    //check mat
    if(fields[currentFigure.x+''+parseInt(currentFigure.y-1)]?.type == 'king' && fields[currentFigure.x+''+parseInt(currentFigure.y-1)].gamer != currentFigure.gamer) {
        store.dispatch(setMat(true));
    }
    if(fields[currentFigure.x+''+parseInt(currentFigure.y+1)]?.type == 'king' && fields[currentFigure.x+''+parseInt(currentFigure.y+1)].gamer != currentFigure.gamer) {
        store.dispatch(setMat(true));
    }
    if(fields[currentFigure.x+1+''+parseInt(currentFigure.y)]?.type == 'king' && fields[currentFigure.x+1+''+parseInt(currentFigure.y)].gamer != currentFigure.gamer) {
        store.dispatch(setMat(true));
    }
    if(fields[currentFigure.x-1+''+parseInt(currentFigure.y)]?.type == 'king' && fields[currentFigure.x-1+''+parseInt(currentFigure.y)].gamer != currentFigure.gamer) {
        store.dispatch(setMat(true));
    }

    coordinates.forEach((elem, index) => {
        if(fields[elem.x+''+elem.y]?.gamer !== currentFigure.gamer && fields[elem.x+''+elem.y]){
            if(fields[elem.x+''+elem.y]?.type == 'king'){
                store.dispatch(setMat(true));
            }
            fields[elem.x+''+elem.y].html = <Cell key={elem.x+''+elem.y} x={x+direction} y={y-1} style="can_stay" figure={fields[elem.x+''+elem.y].html.props.figure} 
                                            onClick={() => clickFigule(elem.x, elem.y)}/>;
            fields[elem.x+''+elem.y].can_stay = true;
        }
    });

 
    return fields;
    
}

export default showRulesHorse;