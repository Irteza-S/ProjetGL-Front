export class Timer {
    private _heures: number = 0;
    private _minutes: number = 0;
    private _secondes: number = 0;
    private _totalSecondes: number = 0;
    private _timer;
    get minutes(): number { return this._minutes; }
    set minutes(min) { this._minutes = min; }
    get secondes(): number { return this._secondes; }
    set secondes(sec) {this._secondes = sec; }
    get heures(): number { return this._heures; }
    set heures(h) { this._heures = h; }

    start() {
      this._timer = setInterval(() => {
        this._heures = Math.floor(++this._minutes / 60);
        this._minutes = Math.floor(++this._totalSecondes / 60);
        this._secondes = this._totalSecondes - this._minutes * 60;
      }, 1000);
    }
    stop() {
      clearInterval(this._timer);
    }
    reset() {
      this._totalSecondes = this._minutes = this._secondes = this._heures =  0;
    }
}
