
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthserviceService } from '../authservice.service';
import { log } from 'console';
import { Router } from '@angular/router';
declare const google: any;
declare global {
  interface Window {
    initMap: () => void;
  }
}

@Component({
  selector: 'app-guardhome',
  templateUrl: './guardhome.component.html',
  styleUrl: './guardhome.component.css'
})
export class GuardhomeComponent {

}
