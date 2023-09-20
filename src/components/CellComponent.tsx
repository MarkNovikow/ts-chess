import React, {FC} from 'react';
import {Cell} from "../models/Cell";

interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void
}

const CellComponent: FC<CellProps> = (props) => {
    return (
        <div
            onClick={() => {
                props.click(props.cell)
            }}
            className={["cell", props.cell.color, props.selected ? "selected" : "",
                props.cell.figure && props.cell.available ? "can-be-attacked" : ""].join(' ')}
        >
            {!props.cell.figure && props.cell.available && <div className="available"></div>}
            <div>{props.cell.figure?.logo && <img src={props.cell.figure.logo} alt=""/>}</div>
        </div>
    );
};

export default CellComponent;