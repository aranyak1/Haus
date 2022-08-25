import { Component, OnInit } from '@angular/core';
import { HouseService } from 'src/app/core/services/house.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-listings',
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.scss']
})
export class MyListingsComponent implements OnInit {
  id = ''
  listings:any = []
  constructor(private route:ActivatedRoute,private houseService:HouseService) { }

  ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id')!;
        this.houseService.getHouseByUserId(this.id).subscribe((res: any) => {
          this.listings = res.data.data;
          console.log(res);
        });
  }

}
