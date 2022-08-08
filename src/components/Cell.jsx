import React from "react";

const Cell = ({x, y, figure, style, onClick}) => {

    return (
        <div className="cell" onClick={onClick}>{/* {x+''+y} */}{figure}</div>
    );
}


export default Cell;