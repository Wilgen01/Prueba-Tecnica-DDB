import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { HelpComponent } from 'src/app/shared/help/help.component';
import { FilterModalComponent } from 'src/app/components/filter-modal/filter-modal.component';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { Beer } from 'src/app/shared/models/beer.model';
import { of } from 'rxjs';
import { inject } from '@angular/core';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { Filter } from 'src/app/shared/models/filter.modal';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;


  beforeEach(async () => {

    const mockBeers: Beer[] = [
      {
        "id": 1,
        "name": "Cassels Milk Stou",
        "description": "Cassels & Sons Brewing. Cerveza porter y stout",
        "img": "assets/products/1.png",
        "price": 75000,
        "category": 2
      },
      {
        "id": 2,
        "name": "Camba Pale Ale",
        "description": "La Souche Franc-Boisd’hiver. Cerveza pale.",
        "img": "assets/products/2.png",
        "price": 85300,
        "category": 1
      }
    ]

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        PipesModule,
        HelpComponent,
        FilterModalComponent,
        ProductCardComponent
      ],
      declarations: [HomeComponent],
      providers: [{ provide: ProductsService, useValue: { getBeers: () => of(mockBeers) } }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBeers on component init', () => {
    const mockBeers: Beer[] = [
      {
        "id": 1,
        "name": "Cassels Milk Stou",
        "description": "Cassels & Sons Brewing. Cerveza porter y stout",
        "img": "assets/products/1.png",
        "price": 75000,
        "category": 2
      },
      {
        "id": 2,
        "name": "Camba Pale Ale",
        "description": "La Souche Franc-Boisd’hiver. Cerveza pale.",
        "img": "assets/products/2.png",
        "price": 85300,
        "category": 1
      }
    ]

    spyOn(component, 'getBeers').and.callThrough();
    component.ngOnInit();

    expect(component.getBeers).toHaveBeenCalledOnceWith();
  })

  it('should set beers variable when getBeers is called', () => {
    const productService = TestBed.inject(ProductsService)
    const mockBeers: Beer[] = [
      {
        "id": 1,
        "name": "Cassels Milk Stou",
        "description": "Cassels & Sons Brewing. Cerveza porter y stout",
        "img": "assets/products/1.png",
        "price": 75000,
        "category": 2
      },
      {
        "id": 2,
        "name": "Camba Pale Ale",
        "description": "La Souche Franc-Boisd’hiver. Cerveza pale.",
        "img": "assets/products/2.png",
        "price": 85300,
        "category": 1
      }
    ]

    spyOn(productService, 'getBeers').and.callFake(() => of(mockBeers))
    component.getBeers();

    expect(component.beers).toEqual(mockBeers);
    expect(productService.getBeers).toHaveBeenCalled();
  })

  it('should set modal open to true when "openModal" is called', () => {
    component.openModal();
    expect(component.isModalOpen).toBe(true)
  })

  it('should update filters when onChangeFilters is called', () => {
    const mockFilters: Filter[] = [{ id: 1, selected: true }];

    component.onChangeFilters(mockFilters);

    expect(component.selectedFilters).toBe(mockFilters)
  })
});
