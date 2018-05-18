import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';
import { ViewChild } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;
  @ViewChild( 'inputFile' ) inputFile: any;

  constructor( public _subirArchivoService: SubirArchivoService, public _modalUploadService: ModalUploadService ) { }

  ngOnInit() {
  }

  seleccionImagen( archivo: File ) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    console.log(archivo);

    // Verifico q el archivo es una imagen
    if (archivo.type.indexOf('image') < 0 ) {
      swal ('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  subirImagen() {
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
        .then( resp => {
          console.log('resp...', resp);
          this._modalUploadService.notificacion.emit (resp);
          this.cerrarModal();
          this.borrarForm();
        })
        .catch( resp => {
          console.log('Error en la carga...');
        });
  }

  cerrarModal () {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }

  borrarForm() {
    console.log('Aqui obtienes el elemento para atribuir algo vazio: ', this.inputFile.nativeElement);

    this.inputFile.nativeElement.value = '';
}

}
