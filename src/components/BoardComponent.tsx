import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";


interface BoardProps {
    board: Board
    setBoard: (board: Board) => void
}

const BoardComponent: FC<BoardProps> = (props) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    const click = (cell: Cell) => {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            setSelectedCell(null);
        } else if (cell.figure) {
            setSelectedCell(cell);
        } else {
            setSelectedCell(null)
        }

    }
    useEffect(() => {
        highlightCells()
    }, [selectedCell]);
    const highlightCells = () => {
        props.board.highlightCells(selectedCell);
        updateBoard();
    }
    const updateBoard = () => {
        const newBoard = props.board.getCopyBoard()
        props.setBoard(newBoard)
    }
    return (
        <div
            className={"board"}>
            {props.board.cells.map((row, idx) => {
                return (
                    <React.Fragment key={idx}>
                        {row.map((cell, idx) => {
                            return <CellComponent click={click} cell={cell} key={idx} selected={
                                selectedCell?.x === cell.x && selectedCell?.y === cell.y
                            }/>
                        })}
                    </React.Fragment>
                )
            })}
        </div>
    );
};

export default BoardComponent;