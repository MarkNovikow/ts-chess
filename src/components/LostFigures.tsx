import React, {FC} from 'react';
import {Figure} from "../models/figures/Figure";


interface LostFiguresProps {
    title: string;
    lostFigures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = (props) => {
    return (
        <div className={"lost"}>
            <h3 className={"title"}>{props.title}</h3>
            {props.lostFigures.map((figure) => {
                return (
                    <div className={"lost-figure"} key={figure.id}>
                        {figure.name} {figure.logo && <img width={20} height={20} src={figure.logo} alt={"figure"}/>}
                    </div>
                )
            })}
        </div>
    );
};

export default LostFigures;