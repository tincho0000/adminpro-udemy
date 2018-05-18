import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';

@Injectable()
export class HospitalService {

  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
  ) { }

  cargarHospitales(desde: number = 0) {
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get( url ).map( (resp: any) => {
      this.totalHospitales = resp.total;
      return resp.hospitales;
    });
  }

  obtenerHospital( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url ).map( (resp: any) => resp.hospital);
  }

  borrarHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=';
    url += this._usuarioService.token;

    return this.http.delete( url ).map( (resp: any) => swal('Hospital borrado', 'Eliminado correctamente', 'success') );

  }

  crearHospital( nombre: string ) {

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=';
    url += this._usuarioService.token;

    return this.http.post( url, {nombre: nombre} ).map( (resp: any) => resp.hospital );
  }

  buscarHospital( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url )
              .map( (resp: any) => resp.hospitales);
  }

  actualizarHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital)
              .map( (resp: any) => {
                swal('Hospital Actualizado', hospital.nombre, 'success');
                return resp.hospital;
              });
  }

}
