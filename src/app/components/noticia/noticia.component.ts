import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor(
    private iab: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService,
    private platform: Platform
  ) { }

  ngOnInit() {}

  openNoticia() {
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {

    let guardarBorrarBtn: any;

    if ( this.enFavoritos ) {

      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        handler: () => {
          console.log('Borrar Favorito');
          this.dataLocalService.borrarNoticia(this.noticia);
        }
      };
    } else {
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        handler: () => {
          console.log('Favorito');
          this.dataLocalService.guardarNoticia(this.noticia);
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Compartir..',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');

          this.compartirNoticia();
        }
      },
      guardarBorrarBtn, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  compartirNoticia() {

    if ( this.platform.is('cordova')) {
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );
    } else {
      if ( navigator['share']) {
        navigator['share']({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url
        }).then(() => console.log('successful share'))
        .catch((error) => console.log('Error sharing', error));
      } else {
        console.log('navegador incompatible');
      }
    }
    
  }

}
