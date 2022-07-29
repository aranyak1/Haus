import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchBarService } from 'src/app/core/services/search-bar.service';

@Component({
  selector: 'app-house-search',
  templateUrl: './house-search.component.html',
  styleUrls: ['./house-search.component.scss'],
})
export class HouseSearchComponent implements OnInit {
  sortBy = null;
  initialLoad = true;
  totalItems = 0;
  currPage = 1;
  queryParams: any = { page: 1 };
  prices = [500, 1000, 1500, 5000];
  ameneties = ['wifi', 'ac', 'TV', 'Kitchen', 'Geyser'];
  ratingsCheckboxGroup: any = [];
  pricingCheckboxGroup: any = [];
  amenetiesCheckboxGroup: any = [];
  constructor(
    private searchBarService: SearchBarService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // if (this.route.snapshot.queryParamMap.get('page') != null) {
    //     let page = this.route.snapshot.queryParamMap.get('page');
    //     this.currPage = +page!;
    //   this.queryParams.page = +page!;
    // }

    searchBarService.showHeaderSearchBar();
    this.populateFilterRatings();
    this.populateFilterPrices();
    this.populateFilterAmeneties();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.searchBarService.hideHeaderSearchBar();
  }

  onPageIndexChange(index: number) {
    console.log(index);
    this.queryParams.page = index;
    this.currPage = index;
    this.navigateWithQueryParams();
  }

  changeTotalItems(data: any) {
    // add query parameter ?page=1 to url
    if (data > 0) {
      // this.queryParams.page = 1;
      this.navigateWithQueryParams();
    }
    this.totalItems = data;

    if (
      this.route.snapshot.queryParamMap.get('page') != null &&
      this.initialLoad == true
    ) {
      let page = this.route.snapshot.queryParamMap.get('page');
      this.currPage = +page!;
      this.queryParams.page = +page!;
    }
    this.initialLoad = false;
  }

  //executed when ever sort by dropdown changes
  sortByValueChanged(value: any) {
    if (value == 'relevance') {
      delete this.queryParams.sort;
    } else {
      this.queryParams.sort = value;
    }
    this.queryParams.page = 1;
    this.currPage = 1;
    this.navigateWithQueryParams();
  }

  // filter houses based on rating, amenities , price
  filter(filterObj: any) {
    console.log(filterObj);
    let filterType = filterObj[0].filterType;
    if (filterType == 'ratingsAverage') {
      let ratingsAverageSelected = false;
      let ratingsMin = Number.MAX_VALUE;
      for (let item of filterObj) {
        if (item.checked) {
          ratingsAverageSelected = true;
          if (item.value < ratingsMin) {
            ratingsMin = item.value;
          }
        }
      }
      // if atlest one filter  in ratings is selected
      if (ratingsAverageSelected) {
        this.queryParams[`ratingsAverage[gte]`] = ratingsMin;
      } else {
        delete this.queryParams[`ratingsAverage[gte]`];
      }
    } else if (filterType === 'price') {
      let priceSelected = false;
      let priceMin = 0,
        priceMax = Number.MAX_VALUE;
      for (let item of filterObj) {
        if (item.checked) {
          priceSelected = true;
          [priceMin, priceMax] = item.split('-');
        }
      }
    } else {
    }
    // after filtering go back to page 1
    this.queryParams.page = 1;
    this.currPage = 1;
    this.navigateWithQueryParams();
  }

  populateFilterRatings() {
    for (let rating = 4; rating >= 1; rating--) {
      this.ratingsCheckboxGroup.push({
        filterType: 'ratingsAverage',
        label: `${rating} ⭐ & up`,
        value: rating,
        checked: false,
      });
    }
  }

  populateFilterPrices() {
    for (let i = 0; i <= this.prices.length; i++) {
      let tempLabel = '';
      let tempValue = '';
      if (i == 0) {
        tempLabel = `less than ₹${this.prices[i]}`;
        tempValue = `lt-${this.prices[i]}`;
      } else if (i == this.prices.length) {
        tempLabel = `more than ₹${this.prices[i - 1]}`;
        tempValue = `gt-${this.prices[i - 1]}`;
      } else {
        tempLabel = `₹${this.prices[i - 1]} - ₹${this.prices[i]}`;
        tempValue = `${this.prices[i - 1]}-${this.prices[i]}`;
      }
      this.pricingCheckboxGroup.push({
        filterType: 'price',
        label: tempLabel,
        value: tempValue,
        checked: false,
      });
    }
  }

  populateFilterAmeneties() {
    for (let amenity of this.ameneties) {
      let amenityLabel;
      if (amenity.length < 3) {
        amenityLabel = amenity.toUpperCase();
      } else {
        amenityLabel = this.titleCase(amenity);
      }
      this.amenetiesCheckboxGroup.push({
        filterType: 'amenities',
        label: amenityLabel,
        value: amenity.split(' ').join('-'),
        checked: false,
      });
    }
  }

  titleCase(str: any) {
    str = str
      .toLowerCase()
      .split(' ')
      .map(function (word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
    return str.join(' ');
  }

  navigateWithQueryParams() {
    console.log(this.queryParams);
    this.router.navigate([], { queryParams: this.queryParams });
  }
}
