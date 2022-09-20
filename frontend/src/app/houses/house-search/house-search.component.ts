import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchBarService } from 'src/app/core/services/search-bar.service';

@Component({
  selector: 'app-house-search',
  templateUrl: './house-search.component.html',
  styleUrls: ['./house-search.component.scss'],
})
export class HouseSearchComponent implements OnInit {
  sortBy: any = 'relevance';
  initialLoad = true;
  totalItems = 0;
  currPage = 1;
  queryParams: any = { page: 1 };
  prices = [500, 1000, 1500, 5000];
  ameneties = ['Tv', 'Kitchen', 'Wifi', 'Ac', 'Geyser'];
  roomType = ['private', 'shared'];
  ratingsCheckboxGroup: any = [];
  pricingCheckboxGroup: any = [];
  roomCheckboxGroup: any = [];
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

    // searchBarService.showHeaderSearchBar();
    this.populateFilterRatings();
    this.populateFilterPrices();
    this.populateFilterRoomType();
    // this.populateFilterAmeneties();
  }

  ngOnInit(): void {
    // this.searchBarService.getQuery().subscribe((query) => {
    //   console.log('query', query);
    //   if (query != '') {
    //     this.queryParams.searchQuery = query;
    //   }
    // });

    this.route.queryParams.subscribe((params) => {
      let searchQuery = params['searchQuery'];
      // console.log('schqry', searchQuery);
      if (
        searchQuery !== undefined ||
        searchQuery !== null ||
        searchQuery != ''
      ) {
        this.queryParams.searchQuery = searchQuery;
      } else {
        delete this.queryParams.searchQuery;
      }
      this.navigateWithQueryParams();
    });


    this.route.queryParams.subscribe((params) => {
      let sort = params['sort'];
      if (sort !== undefined && sort != null) {
        this.sortBy = sort;
        this.sortByValueChanged(this.sortBy);
      } else {
        delete this.queryParams.sort;
        this.sortBy = 'relevance';
      }
    });

    this.route.queryParams.subscribe((params) => {
      let roomState = params['roomState'];
      if (roomState !== null && roomState !== undefined) {
        roomState = roomState.split(',');
        this.roomCheckboxGroup.forEach((obj: any) => {
          obj.checked = roomState?.includes(obj.value.toString());
        });
        this.filter(this.roomCheckboxGroup);
      } else {
        this.roomCheckboxGroup.forEach((obj: any) => {
          obj.checked = false;
        });
        delete this.queryParams[`homeType`];
        delete this.queryParams.roomState;
      }
    });

    this.route.queryParams.subscribe((params) => {
      let pricingState = params['priceState'];
      if (pricingState !== undefined && pricingState !== null) {
        pricingState = pricingState.split(',');
        this.pricingCheckboxGroup.forEach((obj: any) => {
          obj.checked = pricingState?.includes(obj.value.toString());
        });
        this.filter(this.pricingCheckboxGroup);
      } else {
        this.pricingCheckboxGroup.forEach((obj: any) => {
          obj.checked = false;
        });
        delete this.queryParams[`price[gte]`];
        delete this.queryParams[`price[lte]`];
        delete this.queryParams.priceState;
      }
    });

    this.route.queryParams.subscribe((params) => {
      let ratingsState = params['ratingsAverageState'];
      if (ratingsState !== undefined && ratingsState !== null) {
        ratingsState = ratingsState.split(',');
        this.ratingsCheckboxGroup.forEach((obj: any) => {
          obj.checked = ratingsState?.includes(obj.value.toString());
        });
        this.filter(this.ratingsCheckboxGroup);
      } else {
        this.ratingsCheckboxGroup.forEach((obj: any) => {
          obj.checked = false;
        });
        delete this.queryParams[`ratingsAverage[gte]`];
        delete this.queryParams.ratingsAverageState;
      }
    });

    // if (this.route.snapshot.queryParamMap.get('sort') != null) {
    //   this.sortBy = this.route.snapshot.queryParamMap.get('sort');
    //   this.sortByValueChanged(this.sortBy);
    // }

    // if (this.route.snapshot.queryParamMap.get('ratingsAverageState') != null) {
    //   let ratingsState = this.route.snapshot.queryParamMap
    //     .get('ratingsAverageState')
    //     ?.split(',');
    //   this.ratingsCheckboxGroup.forEach((obj: any) => {
    //     obj.checked = ratingsState?.includes(obj.value.toString());
    //   });
    //   this.filter(this.ratingsCheckboxGroup);
    // }

    // if (this.route.snapshot.queryParamMap.get('priceState') != null) {
    //   let pricingState = this.route.snapshot.queryParamMap
    //     .get('priceState')
    //     ?.split(',');
    //   this.pricingCheckboxGroup.forEach((obj: any) => {
    //     obj.checked = pricingState?.includes(obj.value.toString());
    //   });
    //   this.filter(this.pricingCheckboxGroup);
    // }

    // if (this.route.snapshot.queryParamMap.get('homeType') != null) {
    //   let roomState = this.route.snapshot.queryParamMap
    //     .get('roomState')
    //     ?.split(',');
    //   this.roomCheckboxGroup.forEach((obj: any) => {
    //     obj.checked = roomState?.includes(obj.value.toString());
    //   });
    //   this.filter(this.roomCheckboxGroup);
    // }
  }

  ngOnDestroy(): void {
    // this.searchBarService.hideHeaderSearchBar();
  }

  onPageIndexChange(index: number) {
    // console.log('onpageindexchange', index);
    this.queryParams.page = index;
    this.currPage = index;
    this.navigateWithQueryParams();
  }

  changeTotalItems(data: any) {
    this.totalItems = data;

    this.route.queryParams.subscribe((params) => {
      let page = params['page'];
      if (page !== undefined && page !== null) {
        this.currPage = +page!;
        this.queryParams.page = +page!;
      } else {
        // this.currPage = 1;
        // this.queryParams.page = 1;
        delete this.queryParams.page;
      }
      // console.log('sub', page);
      this.navigateWithQueryParams();
    });

    if (
      this.route.snapshot.queryParamMap.get('page') != null &&
      this.initialLoad == true
    ) {
      // console.log('changetotalitems', this.currPage, this.queryParams);
      let page = this.route.snapshot.queryParamMap.get('page');
      this.currPage = +page!;
      this.queryParams.page = +page!;
    }
    // add query parameter ?page=1 to url
    if (data > 0) {
      // this.queryParams.page = 1;
      this.navigateWithQueryParams();
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

  // filter houses based on rating, amenities , price,homeType
  filter(filterObj: any) {
    // console.log(filterObj);
    let filterType = filterObj[0].filterType;
    if (filterType == 'ratingsAverage') {
      let ratingsAverageState = '';
      let ratingsAverageSelected = false;
      let ratingsMin = Number.MAX_VALUE;
      for (let item of filterObj) {
        if (item.checked) {
          if (ratingsAverageState == '') {
            ratingsAverageState += item.value;
          } else {
            ratingsAverageState += ',' + item.value;
          }
          ratingsAverageSelected = true;
          if (item.value < ratingsMin) {
            ratingsMin = item.value;
          }
        }
      }
      // if atlest one filter  in ratings is selected
      if (ratingsAverageSelected) {
        this.queryParams.ratingsAverageState = ratingsAverageState;
        this.queryParams[`ratingsAverage[gte]`] = ratingsMin;
      } else {
        delete this.queryParams[`ratingsAverage[gte]`];
        delete this.queryParams.ratingsAverageState;
      }
    } else if (filterType === 'price') {
      let priceSelected = false;
      let priceState = '';
      let priceMin = Number.MAX_SAFE_INTEGER,
        priceMax = -1;
      for (let item of filterObj) {
        if (item.checked) {
          priceSelected = true;
          if (priceState == '') {
            priceState += item.value;
          } else {
            priceState += ',' + item.value;
          }
          let prices = item.value.split('-').map((x: any) => {
            if (x == 'lt') {
              return 0;
            }
            if (x == 'gt') {
              return Number.MAX_SAFE_INTEGER;
            } else {
              return parseInt(x);
            }
          });
          // console.log(prices);
          if (prices[0] < priceMin) {
            priceMin = prices[0];
          }
          if (prices[1] > priceMax) {
            priceMax = prices[1];
          }
        }
      }
      // if atlest one filter  in price is selected
      if (priceSelected) {
        this.queryParams.priceState = priceState;
        this.queryParams[`price[gte]`] = priceMin;
        this.queryParams[`price[lte]`] = priceMax;
      } else {
        delete this.queryParams[`price[gte]`];
        delete this.queryParams[`price[lte]`];
        delete this.queryParams.priceState;
      }
    } else {
      let roomSelected = false;
      let roomState = '';
      let room: any[] = [];
      for (let item of filterObj) {
        if (item.checked) {
          roomSelected = true;
          if (roomState == '') {
            roomState += item.value;
          } else {
            roomState += ',' + item.value;
          }
          room.push(item.value);
        }
      }
      // if atlest one filter  in room is selected
      if (roomSelected) {
        this.queryParams.roomState = roomState;
        if (room.length == 2) {
          delete this.queryParams[`homeType`];
        }
        if (room.length == 1) {
          this.queryParams[`homeType`] = room[0];
        }
      } else {
        delete this.queryParams[`homeType`];
        delete this.queryParams.roomState;
      }
    }
    // after filtering go back to page 1
    this.queryParams.page = 1;
    this.currPage = 1;
    this.navigateWithQueryParams();
  }

  navigateWithQueryParams() {
    // console.log('navigate with query params', this.queryParams);
    this.router.navigate([], { queryParams: this.queryParams });
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
        tempValue = `${this.prices[i - 1]}-gt`;
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

  populateFilterRoomType() {
    for (let i = 0; i < this.roomType.length; i++) {
      this.roomCheckboxGroup.push({
        filterType: 'room',
        label: this.titleCase(this.roomType[i]),
        value: this.roomType[i],
        checked: false,
      });
    }
  }

  // populateFilterAmeneties() {
  //   for (let amenity of this.ameneties) {
  //     let amenityLabel;
  //     if (amenity.length < 3) {
  //       amenityLabel = amenity.toUpperCase();
  //     } else {
  //       amenityLabel = this.titleCase(amenity);
  //     }
  //     this.amenetiesCheckboxGroup.push({
  //       filterType: 'amenities',
  //       label: amenityLabel,
  //       value: amenity.split(' ').join('-'),
  //       checked: false,
  //     });
  //   }
  // }

  titleCase(str: any) {
    str = str
      .toLowerCase()
      .split(' ')
      .map(function (word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
    return str.join(' ');
  }
}
