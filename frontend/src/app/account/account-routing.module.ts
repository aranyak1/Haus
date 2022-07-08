import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  {
    path: 'account',
    component:AccountComponent,
    children: [
      {
        path: 'users/:id/profile', component: MyProfileComponent
      },
      { path: 'users/:id/bookings', component: MyBookingsComponent },
      { path: 'users/:id/listings', component: MyListingsComponent },]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
