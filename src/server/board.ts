export class Board {

    private _events = {};

    public setEvent(data: any) {
        this._events[data[0]] = data;
    }

    public getEvents() {
        return this._events;
    }

    public clearEvent(data: any) {
        delete this._events[data[0]];
    }
}