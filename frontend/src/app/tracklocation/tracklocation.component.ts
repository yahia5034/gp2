import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { DatePipe } from '@angular/common';
declare const google: any;

@Component({
  selector: 'app-tracklocation',
  templateUrl: './tracklocation.component.html',
  styleUrls: ['./tracklocation.component.css']
})
export class TracklocationComponent implements OnInit {
  constructor(private auth: AuthserviceService, private datePipe: DatePipe) { }

  userLocation: any = {
    lat: -34.397,  // Default latitude
    lng: 150.644, // Default longitude
    result: ''     // Default result
  };

  ngOnInit(): void {
    this.auth.getlocation().subscribe((data) => {
      this.userLocation = data[0];
      console.log(this.userLocation);
      this.loadGoogleMaps(() => {
        this.initMap();
      });
    });
  }

  loadGoogleMaps(callback: () => void): void {
    if (typeof google === 'undefined') {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDrdv2-Yq-YSoYMHVdPY-murMwmhrbS7bs&callback=initMap';
      script.async = true;
      script.defer = true;
      window['initMap'] = () => {
        callback();
      };
      document.body.appendChild(script);
    } else {
      callback();
    }
  }

  initMap(): void {
    const map = new google.maps.Map(document.getElementById('map')!, {
      center: { lat: this.userLocation.lat, lng: this.userLocation.lng },
      zoom: 15
    });

    const pos = {
      lat: this.userLocation.lat,
      lng: this.userLocation.lng
    };

    new google.maps.Marker({
      position: pos,
      map: map,
      title: 'Your Location'
    });
  }

  formatDateAndTime(datee: Date): { time: string, date: string } {
    const formattedDateTime = this.datePipe.transform(datee, 'dd-MM hh.mm')!;
    const dateParts = formattedDateTime.split(' ');
    const date = dateParts[0];
    const time = dateParts[1];

    return {
      date: date,
      time: time
    };
  }

  handleLocationError(error: any): void {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
  }
}
