import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { ProductsService } from './products.service';
import { HttpClient } from '@angular/common/http';
import { Beer } from '../../models/beer.model';
import { of } from 'rxjs';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpClientSpy: {get : jasmine.Spy};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ProductsService(<any> httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return beer array when getBeers is called', (done: DoneFn) => {
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

    httpClientSpy.get.and.returnValue(of(mockBeers));
    service.getBeers().subscribe(res => {
      expect(res).toEqual(mockBeers)
      done()
    });

  })


});
