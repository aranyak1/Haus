import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HouseService } from 'src/app/core/services/house.service';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss'],
})
export class HouseListComponent implements OnInit {
  houses = [];
  @Output() totalItemsEvent: EventEmitter<number> = new EventEmitter();
  constructor(private houseService: HouseService) {
    houseService.houseData$.subscribe((res: any) => {
      if (res != null) {
        this.totalItemsEvent.emit(res.totalResults);
        this.houses = res.data.data;
      }
    });
  }

  ngOnInit(): void {}
}
