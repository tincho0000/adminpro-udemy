import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    // Si no vino la imagen, envio cualquier cosa para que me devuelva el servicio la img por defecto
    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    // Determino si es de google la imagen
    if ( img.indexOf('http') >= 0 ) {
      return img;
    }

    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
      break;

      case 'medico':
        url += '/medicos/' + img;
      break;

      case 'hospital':
        url += '/hospitales/' + img;
      break;

      default:
        console.log('Tipo de imagen no existe, debe ser usuarios, medicos, hospitales');
        url += '/usuarios/xxx';
        break;
    }

    return url;
  }

}
