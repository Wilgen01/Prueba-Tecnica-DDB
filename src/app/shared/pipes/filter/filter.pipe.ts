import { Pipe, PipeTransform } from '@angular/core';
import { Beer } from '../../models/beer.model';
import { Filter } from '../../models/filter.modal';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Beer[], filters: Filter[]): Beer[] {
    if (filters.length == 0) return value

    return value.filter(beer => {
      return filters.some(category => beer.category == category.id)
    })
  }

}
