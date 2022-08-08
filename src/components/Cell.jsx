import React from "react";

const Cell = ({x, y, figure}) => {

    return (
        <div className="cell">{x+''+y}</div>
    );
}


export default Cell;