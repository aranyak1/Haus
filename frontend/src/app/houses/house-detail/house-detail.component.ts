import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseService } from 'src/app/core/services/house.service';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { NzImageService } from 'ng-zorro-antd/image';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.scss'],
})
export class HouseDetailComponent implements OnInit {
  private id: string = '';
  private images = [];
  public house: any = {
    title: '',
    ratingsAverage: 0,
    price:0,
    address: {
      city: '',
      state:''
  }};
  dots = false;
  effect = 'scrollx';
  img_prefix = env.Imagekitio.urlEndpoint + '/homes';
  @ViewChild(NzCarouselComponent, { static: false })
  carousel!: NzCarouselComponent;
  constructor(
    private nzImageService: NzImageService,
    private route: ActivatedRoute,
    private houseService: HouseService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.houseService.getHouseById(this.id).subscribe((res: any) => {
      this.house = res.data.data;
      console.log(this.house)
      this.images = this.house.images.map((img: string) => {
        return {
          src: `${this.img_prefix}/${img}`,
          width: '100%',
          height: '100%',
        };
      });

      console.log(this.images)
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
}
