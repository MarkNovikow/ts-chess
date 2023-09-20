import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import whiteLogo from "../../assets/img/pieces_white/pawn.png";
import blackLogo from "../../assets/img/pieces_black/pawn.png";

export class Pawn extends Figure {
    isFirstStep: boolean = true;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.PAWN;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false
        }
        const direction = this.color === Colors.BLACK ? 1 : -1
        const firstStepDirection = this.color === Colors.BLACK ? 2 : -2
        if ((target.y === this.cell.y + direction || (this.isFirstStep && target.y === this.cell.y + firstStepDirection))
            && target.x === this.cell.x && this.cell.board.getCell(target.x, target.y).isEmpty()) {
            return true
        }
        if (target.y === this.cell.y + direction && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
            && (target.isEnemy(target) || target.enPass)) {
            return true
        }
        return false
    }

    moveFigure(target: Cell) {
        const direction = this.color === Colors.BLACK ? 1 : -1
        if (target.enPass) {
            debugger
            this.cell.board.getCell(target.x, target.y - direction).figure = null;
        }
        super.moveFigure(target);

        if (target.y === this.cell.y + direction * 2) {
            this.cell.board.getCell(this.cell.x, this.cell.y + direction).enPass = true;
        }


        this.isFirstStep = false;


    }
}