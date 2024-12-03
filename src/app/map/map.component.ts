import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // map update to current location
          this.map.setView([latitude, longitude], 15);

          // marker
          L.marker([latitude, longitude]).addTo(this.map)
            .bindPopup('You are here!')
            .openPopup();
        },
        (error) => {
          console.error('Error getting location:', error.message);
          alert('Unable to retrieve your location. Please check your location settings.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }

  }
  ngAfterViewInit() {
    this.initMap()
  }
}
