import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Input,
  SimpleChanges,
} from '@angular/core';
import { Map, NavigationControl, Marker } from 'maplibre-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;
  @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;
  @Input() coordinates = [];
  initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.coordinates.length == 2)
    {
      
      this.initialState.lng = this.coordinates[0];
      this.initialState.lat = this.coordinates[1];
      // console.log('on')
      this.renderMap();
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // console.log('view')
    this.renderMap();
  }

  ngOnDestroy() {
    this.map?.remove();
  }

  renderMap() {
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${environment.mapApiKey}`,
      center: [this.initialState.lng, this.initialState.lat],
      zoom: this.initialState.zoom,
      interactive:false
    });
    this.map.addControl(new NavigationControl({}), 'top-right');
     new Marker({ color: '#FF0000' })
       .setLngLat([this.initialState.lng, this.initialState.lat])
       .addTo(this.map);
  }
}
