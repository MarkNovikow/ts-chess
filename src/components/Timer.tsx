import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null
    restart: () => void
}

const Timer: FC<TimerProps> = (props) => {
    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);
    useEffect(() => {
        startTimer();
    }, [props.currentPlayer]);

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = props.currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(callback, 1000)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prevState => prevState - 1)
    }

    function decrementBlackTimer() {
        setBlackTime(prevState => prevState - 1)
    }

    return (
        <div className={"timer"}>
            <div>
                <button className={"restart"} onClick={() => {
                    setBlackTime(300);
                    setWhiteTime(300);
                    props.restart();

                }}
                >Перезапустить игру
                </button>
            </div>
            <h2>Черные - {blackTime}</h2>
            <h2>Белые - {whiteTime}</h2>
        </div>
    );
};

export default Timer;