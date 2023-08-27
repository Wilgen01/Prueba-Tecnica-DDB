import { Beer } from '../../models/beer.model';
import { Filter } from '../../models/filter.modal';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {

  const pipe = new FilterPipe();
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


  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original array if filter length is 0', () => {
    const mockFilters: Filter[] = []
    expect(pipe.transform(mockBeers, mockFilters)).toEqual(mockBeers)
  })

  it('should return the beers filtered according to their category', () => {
    const mockFilters: Filter[] = [{ id: 1, selected: true }]
    const mockResult: Beer[] = [{
      "id": 2,
      "name": "Camba Pale Ale",
      "description": "La Souche Franc-Boisd’hiver. Cerveza pale.",
      "img": "assets/products/2.png",
      "price": 85300,
      "category": 1
    }]
    expect(pipe.transform(mockBeers, mockFilters)).toEqual(mockResult)
  })


});
