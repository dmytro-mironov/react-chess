import { setMat } from "../../redux/actions/fields";
import store from "../../redux/store";
import Cell from "../Cell";
import { clickFigule } from "../Field";

const showRulesFront = ({fields, currentFigure,x,y}) => {
    //first player + 1
    //second player - 1
    let direction = currentFigure.gamer === 1 ? 1 : -1;

    //if forward not figure
    if(!fields[currentFigure.x + direction+''+y]?.isFigure){
        fields[currentFigure.x + direction+''+y].html = <Cell key={x+direction+''+y} x={x+direction} y={y} style="can_stay" onClick={() => clickFigule(x+direction,y)}/>;
        fields[currentFigure.x + direction+''+y].can_stay = true;
    }

    let coordinates = [
        {x:currentFigure.x + direction,y:y-1},//check left figure
        {x:currentFigure.x + direction,y:parseInt(y)+1},//check right figure
    ]; 

    coordinates.forEach((elem, index) => {
        if(fields[elem.x+''+elem.y]?.isFigure && currentFigure.gamer !== fields[elem.x+''+elem.y]?.gamer){

            if(fields[elem.x+''+elem.y].type == 'king'){
                store.dispatch(setMat(true));
            }
            
            fields[elem.x+''+elem.y].html = <Cell key={elem.x+''+elem.y} x={elem.x} y={elem.y} style="can_stay" 
                                                                figure={fields[elem.x+''+elem.y].html.props.figure}
                                                                onClick={() => clickFigule(elem.x,elem.y)}/>;
            fields[elem.x+''+elem.y].can_stay = true;

        }
    });

    return fields;
}

export default showRulesFront;