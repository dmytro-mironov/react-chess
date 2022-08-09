import React from "react";
import classNames from "classnames";

const Cell = ({x, y, figure, style, onClick}) => {

    let cellStyle = classNames('cell',{
        'choose': style == 'choose',
        'can_stay': style == 'can_stay',
    });

    return (
        <div className={cellStyle} onClick={onClick}>{/* {x+''+y} */}
            <img className="img_figure" src={figure} alt="" />
        </div>
    );
}


export default Cell;