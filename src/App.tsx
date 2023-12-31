import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

function App() {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

    function restart() {
        const newBoard = new Board();
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard);
        setCurrentPlayer(whitePlayer)
    }

    function swapPlayers() {
        if (currentPlayer?.color === Colors.BLACK) {
            setCurrentPlayer(whitePlayer);
        } else {
            setCurrentPlayer(blackPlayer)
        }
    }

    useEffect(() => {
        restart();
        setCurrentPlayer(whitePlayer);

    }, [])
    return (
        <div className="app">
            <Timer currentPlayer={currentPlayer} restart={restart}/>
            <div className={"turn"}>Ход
                {currentPlayer?.color === Colors.BLACK ? " черных" : " белых"}</div>
            <BoardComponent
                board={board}
                setBoard={setBoard}
                swapPlayers={swapPlayers}
                currentPlayer={currentPlayer}
            />
            <div>
                <LostFigures title={"Черные фигуры"} lostFigures={board.lostBlackFigures}></LostFigures>
                <LostFigures title={"Белые фигуры"} lostFigures={board.lostWhiteFigures}></LostFigures>
            </div>

        </div>
    );
}

export default App;
