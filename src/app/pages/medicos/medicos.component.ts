import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/services.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos( this.desde )
          .subscribe( medicos => {

            this.medicos = medicos;
            this.totalRegistros = this._medicoService.totalMedicos;

          });
  }

  buscarMedico( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }

    this._medicoService.buscarMedicos( termino )
            .subscribe( medicos =>  this.medicos = medicos );
  }

  borrarMedico( medico: Medico ) {

     this._medicoService.borrarMedico( medico._id )
            .subscribe( () =>  this.cargarMedicos() );

  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();

  }

}
