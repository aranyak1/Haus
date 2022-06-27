import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { Router } from '@angular/router';;
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-house-list-item',
  templateUrl: './house-list-item.component.html',
  styleUrls: ['./house-list-item.component.scss'],
})
export class HouseListItemComponent implements OnInit {
  private objId: any = undefined;
  public hasBedrooms = false;
  @Input() house: any;
  dots = false;
  effect = 'scrollx';
  @ViewChild(NzCarouselComponent, { static: false })
  carousel!: NzCarouselComponent;
  constructor(private router:Router ) {
   }

  ngOnInit(): void {
    this.objId = this.house._id;
    if (this.house.totalBedrooms > 0) {
      this.hasBedrooms =true;
    }
  }

  next(event: Event) {
    event.stopPropagation();
    this.carousel.next();
  }

  prev(event: Event) {
    event.stopPropagation();
    this.carousel.pre();
  }

  navigate()
  {
    this.router.navigateByUrl(`/homes/${this.objId}`);
  }
}
