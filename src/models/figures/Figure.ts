import logo from '../../assets/img/pieces_black/king.png'
import {Colors} from "../Colors";
import {Cell} from "../Cell";

export enum FigureNames {
    FIGURE = "Фигура",
    ROOK = "Ладья",
    KNIGHT = "Конь",
    BISHOP = "Слон",
    KING = "Король",
    QUEEN = "Ферзь",
    PAWN = "Пешка"
}

export class Figure {
    color: Colors;
    logo: typeof logo | null
    cell: Cell;
    name: FigureNames;
    id: number

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random()
    }

    canMove(target: Cell): boolean {
        if (this.color === target.figure?.color) {
            return false
        }
        if (target.figure?.name === FigureNames.KING) {
            return false
        }
        return true
    }

    moveFigure(target: Cell) {
        this.cell.board.falseEnPass();
    }
}

