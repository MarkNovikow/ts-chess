import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import whiteLogo from "../../assets/img/pieces_white/king.png";
import blackLogo from "../../assets/img/pieces_black/king.png";

export class King extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.KING;
    }

    canMove(target: Cell): boolean {
        const dy = Math.abs(target.y - this.cell.y)
        const dx = Math.abs(target.x - this.cell.x)
        if (dy > 1 || dx > 1) {
            return false
        }
        if (!super.canMove(target)) {
            return false
        }
        if (this.cell.isEmptyVertical(target) || this.cell.isEmptyHorizontal(target) || this.cell.isEmptyDiagonal(target)) {
            return true;
        }
        return true
    }
}
