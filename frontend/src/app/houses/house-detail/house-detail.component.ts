import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseService } from 'src/app/core/services/house.service';
import { BookingService } from 'src/app/core/services/booking.service';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { NzImageService } from 'ng-zorro-antd/image';
import { environment as env } from 'src/environments/environment';
import { differenceInCalendarDays } from 'date-fns';
import { NzDatePickerSizeType } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SearchBarService } from 'src/app/core/services/search-bar.service';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.scss'],
})
export class HouseDetailComponent implements OnInit {
  rangeSize: NzDatePickerSizeType = 'large';
  startDate: any = null;
  endDate: any = null;
  showSearchBarHeader = false;
  searchInputSize = 30;
  travellerInputSize = 20;
  date = null;
  dateFormat = 'dd/MM/yyyy';
  today = new Date();
  totalPrice = 0;
  ameneties: any = [];
  private id: string = '';
  private images = [];
  private totalDays = 1;
  public house: any = {
    title: '',
    ratingsAverage: 0,
    price: 0,
    address: {
      city: '',
      state: '',
    },
  };
  dots = false;
  effect = 'scrollx';
  img_prefix = env.Imagekitio.urlEndpoint + '/homes';
  @ViewChild(NzCarouselComponent, { static: false })
  carousel!: NzCarouselComponent;
  houseCoordinates: any = [];
  constructor(
    private nzImageService: NzImageService,
    private message:NzMessageService,
    private route: ActivatedRoute,
    private houseService: HouseService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.houseService.getHouseById(this.id).subscribe((res: any) => {
      this.house = res.data.data;
      // console.log(this.house);
      //initialise houseCoordinates so we can display it in map
      this.houseCoordinates = this.house.location.coordinates;
      this.images = this.house.images.map((img: string) => {
        return {
          src: `${this.img_prefix}/${img}`,
          width: '100%',
          height: '100%',
        };
      });
      for (let amenity in this.house.ameneties) {
        if (this.house.ameneties[amenity])
          this.ameneties.push(amenity.substring(3));
      }
      // console.log(this.images);
    });
  }

  next(event: Event) {
    event.stopPropagation();
    this.carousel.next();
  }

  prev(event: Event) {
    event.stopPropagation();
    this.carousel.pre();
  }

  onClick(): void {
    this.nzImageService.preview(this.images);
  }

  bookHouse() {
    // console.log(this.date)
    if (this.startDate != null && this.endDate != null) {
      let data = {
        homeId:this.id,
        startDate: this.startDate,
        endDate: this.endDate
      }
      this.bookingService.createBooking(data).subscribe((res) => {
        this.message.create('success', `House booked succesfully!!`);
        this.date = null;
        this.totalPrice = 0
      });
    }
  }

  onDateChange(result: Date[]): void {
    this.startDate = result[0];
    this.endDate = result[1];
    this.totalDays = differenceInCalendarDays(result[1], result[0]);
    this.totalPrice = (this.totalDays + 1) * this.house.price;
  }

  getFormattedDate(date: Date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return dd + '/' + mm + '/' + yyyy; 
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
  };
}
