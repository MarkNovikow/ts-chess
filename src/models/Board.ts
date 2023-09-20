import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Pawn} from "./figures/Pawn";
import {Knight} from "./figures/Knight";
import {Bishop} from "./figures/Bishop";
import {Rook} from "./figures/Rook";
import {King} from "./figures/King";
import {Queen} from "./figures/Queen";
import {Figure} from "./figures/Figure";


export class Board {
    cells: Cell[][] = []
    lostBlackFigures: Figure[] = []
    lostWhiteFigures: Figure[] = []

    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 8; j++) {

                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null))
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null))
                }
            }
            this.cells.push(row);
        }
    }

    public highlightCells(SelectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!SelectedCell?.figure?.canMove(target);
            }
        }
    }

    public falseEnPass() {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                row[j].enPass = false
            }
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostBlackFigures = this.lostBlackFigures
        newBoard.lostWhiteFigures = this.lostWhiteFigures
        return newBoard;
    }

    public getCell(x: number, y: number): Cell {
        return this.cells[y][x]
    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.WHITE, this.getCell(i, 6))
            new Pawn(Colors.BLACK, this.getCell(i, 1))

        }
    }

    private addKnights() {
        new Knight(Colors.WHITE, this.getCell(1, 7));
        new Knight(Colors.WHITE, this.getCell(6, 7));
        new Knight(Colors.BLACK, this.getCell(1, 0));
        new Knight(Colors.BLACK, this.getCell(6, 0));
    }

    private addBishops() {
        new Bishop(Colors.WHITE, this.getCell(2, 7));
        new Bishop(Colors.WHITE, this.getCell(5, 7));
        new Bishop(Colors.BLACK, this.getCell(2, 0));
        new Bishop(Colors.BLACK, this.getCell(5, 0));
    }

    private addQueens() {
        new Queen(Colors.WHITE, this.getCell(3, 7))
        new Queen(Colors.BLACK, this.getCell(3, 0))
    }

    private addKings() {
        new King(Colors.WHITE, this.getCell(4, 7))
        new King(Colors.BLACK, this.getCell(4, 0))
    }

    private addRooks() {
        new Rook(Colors.WHITE, this.getCell(0, 7));
        new Rook(Colors.WHITE, this.getCell(7, 7));
        new Rook(Colors.BLACK, this.getCell(0, 0));
        new Rook(Colors.BLACK, this.getCell(7, 0));
    }

    public addFigures() {
        this.addRooks();
        this.addKnights();
        this.addBishops();
        this.addQueens();
        this.addKings();
        this.addPawns();
    }
}