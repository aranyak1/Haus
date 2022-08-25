import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HousesRoutingModule } from './houses-routing.module';
import { HouseSearchComponent } from './house-search/house-search.component';
import { SharedModule } from '@shared/shared.module';
import { HouseListComponent } from './house-list/house-list.component';
import { HouseListItemComponent } from './house-list-item/house-list-item.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzImageModule } from 'ng-zorro-antd/image';
import { HouseDetailComponent } from './house-detail/house-detail.component';

@NgModule({
  declarations: [
    HouseSearchComponent,
    HouseListComponent,
    HouseListItemComponent,
    HouseDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HousesRoutingModule,
    SharedModule,
    NzCarouselModule,
    NzImageModule,
  ],
  exports: [HouseListItemComponent],
})
export class HousesModule {}
