import { Component, OnInit, inject } from '@angular/core';
import { Beer } from 'src/app/shared/models/beer.model';
import { Filter } from 'src/app/shared/models/filter.modal';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly _productsService = inject(ProductsService);

  public beers: Beer[] = []
  public filteredBeers: Beer[] = []
  public isModalOpen: boolean = false;

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
    if (filters.length == 0) {
      this.filteredBeers = []
      return
    }

    console.log('pasó');
    
    this.filteredBeers = this.beers.filter(beer => {
      return filters.some(category => beer.category == category.id)
    })
  }

}
