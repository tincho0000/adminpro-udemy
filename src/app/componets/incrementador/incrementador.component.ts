import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';
import { APP_ROUTES } from '../../app.routes';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  // Se hizo con nombre para que cuando se llama a este input en el html se le pase nombre en vez de leyenda
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  @ViewChild('txtProgress') txtProgress: ElementRef;

  constructor() {
    // console.log('Leyenda', this.leyenda);
    // console.log('Progreso', this.progreso);
   }

  ngOnInit() {
    // console.log('Leyenda', this.leyenda);
    // console.log('Progreso', this.progreso);
  }

  onChange( newValue: number ) {

    // let elemHTML: any = document.getElementsByName('progreso')[0];
    // console.log('html', elemHTML);
    // console.log('nuevo valor', newValue);

    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    // elemHTML.value = this.progreso;
    // console.log('html', elemHTML.value);
    // console.log('this.progreso', this.progreso);

    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit(this.progreso);
  }

  cambiarValor ( valor: number ) {
    console.log('valor', valor);
    if (this.progreso >= 100 && valor > 0) {
    this.progreso = 100;
    return;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;
    this.cambioValor.emit(this.progreso);

    // Para dejar el foco en la caja
    this.txtProgress.nativeElement.focus();
  }

}
