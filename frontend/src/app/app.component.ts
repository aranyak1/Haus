import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Haus';
  isLoading: Boolean = false;
  constructor(private spinner: LoaderService) {
    spinner.isLoading$.subscribe((obsValue) => {
      this.isLoading = obsValue;
      // setTimeout(() => {
      //   spinner.startSpinner();
      // },1000);
      // console.log(obsValue);
    });
  }
}
