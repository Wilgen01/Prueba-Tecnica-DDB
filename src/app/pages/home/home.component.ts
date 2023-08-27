import { Component, OnInit, inject } from '@angular/core';
import { Beer } from 'src/app/shared/models/beer.model';
import { Filter } from 'src/app/shared/models/filter.modal';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class HomeComponent implements OnInit {
  private readonly _productsService = inject(ProductsService);

  public beers: Beer[] = []
  public isModalOpen: boolean = false;
  public selectedFilters : Filter[] = [];

  ngOnInit(): void {
    this.getBeers();
  }

  public getBeers() {
    this._productsService.getBeers().subscribe(res => {
      this.beers = res
    })
  }

  public openModal() {
    this.isModalOpen = true;
  }

  public onChangeFilters(filters: Filter[]){
    this.selectedFilters = filters;
  }

}
