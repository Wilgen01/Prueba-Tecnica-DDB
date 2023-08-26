import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { HelpComponent } from '../shared/help/help.component';
import { FilterModalComponent } from '../components/filter-modal/filter-modal.component';
import { PipesModule } from '../shared/pipes/pipes.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    PipesModule,
    ProductCardComponent,
    HelpComponent,
    FilterModalComponent
  ]
})
export class PagesModule { }
