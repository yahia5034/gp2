import { Component, ElementRef, ViewChild, PLATFORM_ID, Inject, OnInit, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { isPlatformBrowser } from '@angular/common';
import { DatePipe } from '@angular/common';
import internal from 'stream';
import { HttpClient } from '@angular/common/http';

declare const google: any;
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror:
    | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any)
    | null;
  onnomatch:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any)
    | null;
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any)
    | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: SpeechRecognitionErrorCode;
}

declare enum SpeechRecognitionErrorCode {
  'no-speech',
  'aborted',
  'audio-capture',
  'network',
  'not-allowed',
  'service-not-allowed',
  'bad-grammar',
  'language-not-supported',
}
@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css'],
}) 
export class UserhomeComponent implements OnInit ,OnDestroy{
  mapscalled: boolean = false;
  chatcalled: boolean = false;

  
  map:any
  interval:any
  timeout:any
  recognition!: SpeechRecognition;
  private renderer: Renderer2;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private rendererFactory: RendererFactory2,
    private datePipe: DatePipe,
    private route: Router,
    private http: HttpClient,
    private router:ActivatedRoute,
    private authservice: AuthserviceService
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null)
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleMaps(() => {
        this.initMap();
      });
      this.interval = setInterval(() => {
        this.loadGoogleMaps(() => {
          this.initMap();
        });
      }, 900000);
    }
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
  Talkfunc() {
    console.log('inyerval')
  }

  addguardfunc() {
    this.route.navigate(['/addguard'],{relativeTo:this.router});
  }

  @ViewChild('startBtn') startBtnRef!: ElementRef;
  @ViewChild('output') outputRef!: ElementRef;
  @ViewChild('Result') HTMLResultRef!: ElementRef;


  startRecognition(): void {
    if (isPlatformBrowser(this.platformId)) {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      this.recognition = new ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)();
      this.recognition.interimResults = false;
  
      const startBtn: HTMLButtonElement | null = this.startBtnRef.nativeElement;
      const output: HTMLElement | null = this.outputRef.nativeElement;
      const HTMLResult: HTMLElement | null = this.HTMLResultRef.nativeElement;
  
      if (startBtn && output && HTMLResult) {
        startBtn.disabled = true;
        output.textContent = 'Listening...';
  
        this.recognition.onstart = () => {
          console.log('Speech recognition started');
        };
  
        this.recognition.onresult = (event: SpeechRecognitionEvent) => {
          const results: SpeechRecognitionResultList = event.results;
          if (results && results.length > 0) {
            var transcript: string = results.item(0)?.item(0)?.transcript || '';
            console.log(transcript);
            if (transcript === 'maps' || transcript == 'map') {
              output.textContent = '';
             
              this.loadGoogleMaps(() => {
                this.initMap();
                
              });
            }
              else if(transcript.trim() === 'send' || transcript.trim() === 'location'){
                output.textContent = '';
                this.loadGoogleMaps(() => {
                  this.initMap();
                });
              }
              else if(transcript.startsWith('go')){
                this.chatcalled = false;
                transcript = transcript.replace('go', ' ').trim();
                console.log(transcript);
                this.openGoogleMapsApp("29.8347672,31.252034", transcript);  // Replace with your desired origin coordinates
            }
            else if(transcript==='read'){
              this.chatcalled = false;
              this.mapscalled=false// Set flag to true
              this.onSubmit();
            }
             else {
              this.chatcalled = true;
              this.mapscalled=false;
              output.textContent = `${transcript}`;
              console.log(this.chatcalled);
            }
          } else {
            output.textContent = 'You said nothing';
          }
        };
  
        this.recognition.onend = () => {
          console.log('Speech recognition ended');
          const outputText = output.textContent;
          if (this.chatcalled == true) {
            const url = 'https://server-ivory-iota.vercel.app/api/control';
            const options = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ message: outputText })
            };
  
            fetch(url, options)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(data => {
                console.log('Response from server:', data);
                this.textToSpeech(data.message);
                HTMLResult.textContent = `${data.message}`;
              })
              .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
              });
          }
          setTimeout(() => {
            startBtn.disabled = false;
          }, 1000);
        };
  
        this.recognition.start();
      }
    } else {
      alert('Speech recognition not supported in your browser');
    }
  }
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

  loadGoogleMaps(callback: () => void): void {
    if (typeof google === 'undefined') {
      const script = this.renderer.createElement('script');
      this.renderer.setAttribute(script, 'type', 'text/javascript');
      this.renderer.setAttribute(script, 'src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDrdv2-Yq-YSoYMHVdPY-murMwmhrbS7bs&callback=initMap');
      this.renderer.setAttribute(script, 'async', 'true');
      this.renderer.setAttribute(script, 'defer', 'true');
      window['initMap'] = () => {
        callback();
      };
      this.renderer.appendChild(document.body, script);
    } else {
      callback();
    }
  }

  initMap(): void {
    this.mapscalled = true;
    this.chatcalled = false;
  this.map = new google.maps.Map(document.getElementById('map')!, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 15
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'location': pos }, (results: any, status: any) => {
          if (status === 'OK') {
            if (results[0]) {
              const datee = new Date();
              const formattedDateTime = this.formatDateAndTime(datee);
              const location = {
                from: this.authservice.loginUser.email,
                to: this.authservice.loginUser.userguard.guardemail,
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
                result: results[0].formatted_address,
                time: formattedDateTime.time,
                date: formattedDateTime.date
              };
              this.authservice.insertlocation(location).subscribe((data)=>{
                console.log(data)
              })
            }
          } else {
            console.log(`Geocoder failed due to: ${status}`);
          }
        });

        this.map.setCenter(pos);
        new google.maps.Marker({
          position: pos,
          map: this.map,
          title: 'Your Location'
        });
      }, (error) => {
        this.handleLocationError(error);
      });
    } else {
      this.handleLocationError({ code: 0 });
    }
  }
  calculateAndDisplayRoute(destination:any) {
    console.log('in calculateAndDisplayRoute',destination)
    // const destination = (document.getElementById('destination') as HTMLInputElement).value;
    const directionsService = new google.maps.DirectionsService();
    directionsService.route({
      origin: this.map.getCenter(),
      destination: destination,
      travelMode: 'WALKING'
    }, (response: any, status: any) => {
      if (status === 'OK') {
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  openGoogleMapsApp(originCoords: string, destinationName: string) {
    // Geocode the destination name to get its coordinates
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': destinationName }, (results: any, status: any) => {
        if (status === 'OK') {
            const destination = results[0].geometry.location.lat() + "," + results[0].geometry.location.lng();
            
            // Explicitly set the zoom level to 12
            const url = `https://www.google.com/maps/dir/?api=1&origin=${originCoords}&destination=${encodeURIComponent(destination)}&z=12`;
            
            window.open(url, '_blank');
            console.log(url);
        } else {
            console.error('Geocode was not successful for the following reason: ' + status);
        }
    });
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

  isRecognitionInProgress: boolean = false;  // Flag to check if speech recognition is in progress
  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;

  onSubmit(): void {
    console.log('onSubmit triggered');
    
    const fileInput = this.imageInput.nativeElement;
  
    const fileSelected = new Promise<void>((resolve) => {
      fileInput.onchange = () => {
        console.log(fileInput);
        resolve();
      };
    });
  
    fileInput.click();  // Programmatically trigger the file input's click event
  
    fileSelected.then(() => {
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append('image', fileInput.files[0]);
  
        this.http.post<{ text: string }>('https://server-ivory-iota.vercel.app/upload', formData)
          .subscribe(
            data => {
              console.log('HTTP POST success:', data);
              this.textToSpeech(data.text);
              this.isRecognitionInProgress = false;  // Reset flag
            },
            error => {
              console.error('Error:', error);
              this.isRecognitionInProgress = false;  // Reset flag
            }
          );
      } else {
        console.log('Using the last selected image');
        // Call fetchAndSpeakText to extract and speak text from the last selected image
      }
    });
  }
  

  textToSpeech(message: string): void {
    console.log('textToSpeech triggered');
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(message);
      synth.speak(utterance);
    } else {
      alert('Speech synthesis is not supported by your browser.');
      this.isRecognitionInProgress = false;  // Reset flag
    }
  }
  logout(){
      this.route.navigate(['/auth'],{relativeTo:this.router})
  }
}
