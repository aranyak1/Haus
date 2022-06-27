import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseSearchComponent } from './house-search/house-search.component';
import { HouseDetailComponent } from './house-detail/house-detail.component';

const routes: Routes = [
  { path: 'search', component: HouseSearchComponent },
  { path: 'homes/:id', component: HouseDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HousesRoutingModule { }
