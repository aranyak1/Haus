import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AccountComponent,
    MyProfileComponent,
    MyBookingsComponent,
    MyListingsComponent,
  ],
  imports: [CommonModule, FormsModule,SharedModule, AccountRoutingModule],
})
export class AccountModule {}
