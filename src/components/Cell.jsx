import React from "react";
import classNames from "classnames";

const Cell = React.memo(({x, y, figure, style, onClick}) => {

    let cellStyle = classNames('cell',{
        'choose': style == 'choose',
        'can_stay': style == 'can_stay',
        'control_select': style == 'control_select',
    });

    return (
        <div className={cellStyle} onClick={onClick}>{/* {x+''+y} */}
            <img className="img_figure" src={figure} alt="" />
        </div>
    );
});


export default Cell;