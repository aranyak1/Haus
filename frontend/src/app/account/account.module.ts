import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

@NgModule({
  declarations: [
    AccountComponent,
    MyProfileComponent,
    MyBookingsComponent,
    MyListingsComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
