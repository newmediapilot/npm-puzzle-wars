import {Board} from './board';

export class App {

    // TODO: create interface for `evts`
    // TODO: create interface for `data`
    private evts: any = {};
    private board: Board;

    public setEvent(data: any) {
        this.evts[data[0]] = data;

        const mouseDown = data.filter(item=>{
           return
        });
    }

    public getEvents() {

        // Continuously monitor this
        this.evts.length = Buffer.from(JSON.stringify(this.evts)).length;

        return this.evts;
    }

    public clearEvent(data: any) {
        delete this.evts[data[0]];
    }

    public createBoard(options) {

        this.board = new Board(options);

        this.evts.pieces = this.board.getPieces();
    }
}