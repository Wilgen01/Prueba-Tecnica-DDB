import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Beer } from '../../models/beer.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly http: HttpClient) { }

  public getBeers(){
    return this.http.get<Beer[]>('../../../../assets/data/beers.json')
  }
}
