import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";


interface BoardProps {
    board: Board
    setBoard: (board: Board) => void
    swapPlayers: () => void
    currentPlayer: Player | null
}

const BoardComponent: FC<BoardProps> = (props) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    const click = (cell: Cell) => {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            props.swapPlayers();
            setSelectedCell(null);
        } else if (cell.figure && cell.figure.color === props.currentPlayer?.color) {
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