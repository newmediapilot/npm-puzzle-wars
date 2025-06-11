export class Board {

    //
    private _pieces: any = [];

    // across, own, width, height
    constructor({a, d, w, h}) {
        this.build(a, d, w, h);
    }

    getPieces() {
        return this._pieces;
    }

    // creates the virtual board of pieces
    private build(
        across,
        down,
        width,
        height,
    ) {
        for (let a = 0; a < down; a++) {
            for (let d = 0; d < across; d++) {
                this._pieces.push({
                    lS: a * width,    // left solve
                    tS: d * height,   // top solve
                    lC: a * width,    // left current
                    tC: d * height,   // top current
                    d: false,         // dragging?
                    w: width,         // width
                    h: height,        // height
                })
            }
        }
    }
}