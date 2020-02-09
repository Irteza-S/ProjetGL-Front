import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Timer } from '../..//model/timer';
import { State } from '../../model/state';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StopwatchComponent implements OnInit {
  closeResult: string;
  constructor(private modalService: NgbModal) {}
  private _btnPlay: string = 'Démarrer';
  private _timer: Timer = new Timer();
  private _state: State = new State();
  play() {
      this._timer.start();
      this._state.setPlay();
      this._btnPlay = 'Continuer';
  }
  stop() {
      this._timer.stop();
      this._state.setStop();
  }
  backward() {
      this._timer.reset();
      this._state.setBackward();
      this._btnPlay = 'Démarrer';
  }
  save() {
    console.log(this._timer);
  }
  ngOnInit() {
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}
