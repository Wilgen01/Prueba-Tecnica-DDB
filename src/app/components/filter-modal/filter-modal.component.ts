import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Filter } from 'src/app/shared/models/filter.modal';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('200ms', style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms', style({ transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
})
export class FilterModalComponent {

  @Input() isModalOpen: boolean = false;
  @Output() modalClose = new EventEmitter<boolean>();
  @Output() filtersSelected = new EventEmitter<Filter[]>();

  public filterCount: number = 0

  public filters: Filter[] = [
    { id: 1, name: "Rubia", selected: false },
    { id: 2, name: "Morena", selected: false },
    { id: 3, name: "Roja", selected: false }
  ]
  public appliedFilters: Filter[] = structuredClone(this.filters);

  public closeModal() {
    this.filters = structuredClone(this.appliedFilters);
    this.setFilterCount();
    this.isModalOpen = false;
    this.modalClose.emit(true);
  }

  /**
   * Solo Filtrará cuando se de click en el botón "Filtrar"
   * De lo contrario se regresan los filtros anteriores
   */
  public onFilter() {
    const filtersSelected = this.onFilterInputsChange();
    this.appliedFilters = structuredClone(this.filters)
    this.filtersSelected.emit(filtersSelected)
    this.closeModal();
  }

  public onFilterInputsChange(){
    const filtersSelected = this.filters.filter(item => item.selected)
    this.filterCount = filtersSelected.length
    return filtersSelected;
  }

  public setFilterCount(){
    this.filterCount = this.getSelectedFilters().length;
  }

  public getSelectedFilters(){
    return this.filters.filter(item => item.selected);
  }

  public clearFilters(){
    this.filters.forEach(filter => {
      filter.selected = false
    })

    this.onFilter();
  }
}
