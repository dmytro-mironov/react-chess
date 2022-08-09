import React from "react";
import classNames from "classnames";

const Cell = ({x, y, figure, style, onClick}) => {

    let cellStyle = classNames('cell',{
        'choose': style == 'choose',
    });

    return (
        <div className={cellStyle} onClick={onClick}>{/* {x+''+y} */}{figure}</div>
    );
}


export default Cell;