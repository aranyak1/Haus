import { Component, OnInit,Input, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { differenceInCalendarDays } from 'date-fns';
import { NzDatePickerSizeType } from 'ng-zorro-antd/date-picker';
import { SearchBarService } from 'src/app/core/services/search-bar.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  rangeSize:NzDatePickerSizeType = 'large';
  showSearchBarHeader = false;
  searchInputSize = 30;
  travellerInputSize = 20;
  date = null;
  dateFormat = 'dd/MM/yyyy';
  today = new Date();
  searchForm = new FormGroup({
    searchQuery: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    startDate: new FormControl(),
    endDate: new FormControl(),
    guests: new FormGroup({
      adults: new FormControl(),
      childrens: new FormControl(),
      infants: new FormControl(),
    }),
  });

  constructor(private searchBarService: SearchBarService) {
    searchBarService.showSearchBarOnHeader$.subscribe(data => {
      if (data)
      {
        this.searchInputSize = 17;
        this.travellerInputSize = 15;
        this.showSearchBarHeader = true;
      }
      else
      {
        this.searchInputSize = 30;
        this.travellerInputSize = 20;
        this.showSearchBarHeader = false;
      }
    })
  }

  ngOnInit(): void {  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
  };

  getFormattedDate(date: Date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
  }

  onDateChange(result: Date[]): void {
    this.searchForm.patchValue({
      startDate: this.getFormattedDate(result[0]),
      endDate: this.getFormattedDate(result[1]),
    });
  }

  setAdults(adultsCount: number) {
    this.searchForm.patchValue({ guests: { adults: adultsCount } });
  }

  setChildrens(childrensCount: number) {
    this.searchForm.patchValue({ guests: { childrens: childrensCount } });
  }
  setInfants(infantsCount: number) {
    this.searchForm.patchValue({ guests: { infants: infantsCount } });
  }
  onSubmit() {
    if (this.searchForm.status) {
      console.log(this.searchForm.value);
    }
  }
}
