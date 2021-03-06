import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchBarComponent } from './ui-components/search-bar/search-bar.component';
import { ErrorComponent } from './error.component';
import { SpinnerComponent } from './spinner.component';
import { CounterComponent } from './ui-components/counter.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ImagekitioAngularModule } from 'imagekitio-angular';
import { MapsComponent } from './maps/maps.component';

@NgModule({
  declarations: [
    FooterComponent,
    SearchBarComponent,
    HeaderComponent,
    ErrorComponent,
    SpinnerComponent,
    CounterComponent,
    MapsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzPopoverModule,
    NzInputModule,
    NzIconModule,
    NzPaginationModule,
    NzSelectModule,
    NzMessageModule,
    ReactiveFormsModule,
    FormsModule,
    ImagekitioAngularModule,
  ],
  exports: [
    NzIconModule,
    NzInputModule,
    NzPaginationModule,
    NzDatePickerModule,
    NzCheckboxModule,
    NzSelectModule,
    NzMessageModule,
    FooterComponent,
    HeaderComponent,
    SearchBarComponent,
    SpinnerComponent,
    CounterComponent,
    ImagekitioAngularModule,
    MapsComponent
  ],
})
export class SharedModule {}
