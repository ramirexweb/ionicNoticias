import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor(
    private noticiasService: NoticiasService
  ) {}

  ngOnInit(): void {

    this.cargarNoticias();
  }


  loadData(event: any) {
    this.cargarNoticias(event);
  }


  cargarNoticias(event?: any) {
    this.noticiasService.getTopHeadLines()
      .subscribe( data => {
        console.log(data);

        if ( data.articles.length === 0 ) {
          event.target.disabled = true;
          return;
        }
        this.noticias.push(...data.articles);

        if(event) {
          event.target.complete();
        }
      });
  }

}
