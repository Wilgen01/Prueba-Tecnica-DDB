import { Component, OnInit, inject } from '@angular/core';
import { Beer } from 'src/app/shared/models/beer.model';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly _productsService = inject(ProductsService);

  public beers: Beer[] = []
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

}
