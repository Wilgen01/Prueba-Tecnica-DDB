import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Filter } from 'src/app/shared/models/filter.modal';


@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
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

  public closeModal() {
    this.isModalOpen = false;
    this.modalClose.emit(true);
  }

  public onFilter() {
    const filtersSelected = this.onFilterInputsChange();
    this.filtersSelected.emit(filtersSelected)
    this.closeModal();
  }

  public onFilterInputsChange(){
    const filtersSelected = this.filters.filter(item => item.selected)
    this.filterCount = filtersSelected.length
    return filtersSelected;
  }

  public clearFilters(){
    this.filters.forEach(filter => {
      filter.selected = false
    })

    this.onFilter();
  }
}
