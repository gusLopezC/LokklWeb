import { Pipe, PipeTransform } from '@angular/core';

import { URL_AWS } from '../config/config';


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipo: string = 'profile'): any {


    let url = URL_AWS + '/images/';
    if (!imagen) {
      return url + 'profile/avatar3.png';
    }

    if (imagen.indexOf('https') >= 0) {
      return imagen;
    }
    switch (tipo) {

      case 'profile':
        url += 'profile/' + imagen;
        break;

      case 'tours':
        url += 'tours/' + imagen;
        break;

      case 'imagenesfondo':
        url += 'imagenesfondo/' + imagen;
        break;


      default:
        url += '/default/aaa';


    }
    return url;
  }

}
