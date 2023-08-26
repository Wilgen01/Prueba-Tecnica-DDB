import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class FilterModalComponent {
  public filters = [
    { id: 1, name: "Rubia", selected: false },
    { id: 2, name: "Morena", selected: false },
    { id: 3, name: "Roja", selected: false }
  ]

  public isModalOpen: boolean = false;


  closeModal() {
    this.isModalOpen = false;
  }
}
