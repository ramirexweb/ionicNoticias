import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, {static: true}) segment: IonSegment;
  noticias: Article[] = [];

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  constructor(
    private noticiasService: NoticiasService
  ) {}

  ngOnInit(): void {
    this.segment.value = this.categorias[0];

    this.selectCategoriaNoticias(this.categorias[0]);
  }

  cambioCategoria( event: any) {
    this.noticias = [];
    this.selectCategoriaNoticias(event.detail.value);
  }

  private selectCategoriaNoticias(categoria: string, event?: any) {
    this.noticiasService.getTopHeadlinesCategoria( categoria)
      .subscribe( resp => {
        this.noticias.push(...resp.articles);

        if( event ) {
          event.target.complete();
        }
      });
  }

  loadData(event :any) {
    this.selectCategoriaNoticias( this.segment.value, event);
  }

}
