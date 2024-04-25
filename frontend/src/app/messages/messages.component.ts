import { Component } from '@angular/core';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  constructor(private auth:AuthserviceService){}
  messages: any[] = [];
 returnedlocation:any []=[]
  ngOnInit(): void {
    this.auth.getlocation().subscribe((data)=>{
      this.returnedlocation=data
      this.messages = this.getConversation();
      this.messages=this.messages.reverse()
      console.log(this.messages)
    })
    
    
  }





  getConversation(): any[] {
    // Combine and sort messages by timestamp in reverse order
    return [...this.returnedlocation].sort((a, b) => {
      // Compare time first (reverse order)
      const timeComparison = new Date(b.time).getTime() - new Date(a.time).getTime();
      
      // If times are equal, compare date (reverse order)
      if (timeComparison === 0) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      
      return   timeComparison;
    });
  
  }
}
